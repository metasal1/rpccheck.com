import { type NextRequest, NextResponse } from "next/server"

function isSafeRpcUrl(raw: string): boolean {
  let u: URL
  try {
    u = new URL(raw)
  } catch {
    return false
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return false
  const host = u.hostname.toLowerCase()
  if (host === "localhost" || host.endsWith(".local") || host === "0.0.0.0") return false
  if (/^(127|10|192\.168|169\.254)\./.test(host)) return false
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) return false
  if (host.includes(":")) return false
  return true
}

async function rpcCall(endpoint: string, method: string, timeoutMs: number) {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params: [] }),
      signal: controller.signal,
    })
    const data = await response.json()
    return { ok: response.ok && !data.error, status: response.status, result: data.result, error: data.error }
  } finally {
    clearTimeout(t)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { endpoint } = await request.json()
    if (!endpoint || typeof endpoint !== "string") {
      return NextResponse.json({ error: "Endpoint is required" }, { status: 400 })
    }
    if (!isSafeRpcUrl(endpoint)) {
      return NextResponse.json({ error: "Invalid RPC URL" }, { status: 400 })
    }

    const start = Date.now()
    const slotRes = await rpcCall(endpoint, "getSlot", 8000)
    const latencyMs = Date.now() - start

    if (!slotRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: slotRes.error ? "RPC error" : "RPC call failed",
          status: slotRes.status,
          rpcError: slotRes.error,
          latencyMs,
        },
        { status: 200 },
      )
    }

    let blockHeight: number | null = null
    let health: string | null = null
    try {
      const heightRes = await rpcCall(endpoint, "getBlockHeight", 3000)
      if (heightRes.ok && typeof heightRes.result === "number") blockHeight = heightRes.result
    } catch {
      /* optional */
    }
    try {
      const healthRes = await rpcCall(endpoint, "getHealth", 3000)
      if (healthRes.ok) health = typeof healthRes.result === "string" ? healthRes.result : "ok"
    } catch {
      /* optional */
    }

    return NextResponse.json({
      success: true,
      slot: slotRes.result,
      blockHeight,
      health,
      latencyMs,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    const timeout = error instanceof Error && error.name === "AbortError"
    return NextResponse.json(
      { success: false, error: timeout ? "Request timeout" : "Invalid request", details: message },
      { status: timeout ? 408 : 400 },
    )
  }
}
