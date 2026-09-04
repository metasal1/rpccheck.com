"use client"

import { useEffect, useState } from "react"
import { Activity, AlertCircle, CheckCircle, Clock, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

type Network = "mainnet" | "devnet" | "testnet"
type Status = "online" | "slow" | "offline" | "checking"

interface Endpoint {
  name: string
  network: Network
  endpoint: string
}

interface Row {
  name: string
  network: Network
  endpoint: string
  status: Status
  latencyMs?: number
  slot?: number
  blockHeight?: number
  health?: string | null
  lastChecked: Date
}

const PUBLIC: Endpoint[] = [
  { name: "Solana Labs", network: "mainnet", endpoint: "https://api.mainnet-beta.solana.com" },
  { name: "Solana Labs", network: "devnet", endpoint: "https://api.devnet.solana.com" },
  { name: "Solana Labs", network: "testnet", endpoint: "https://api.testnet.solana.com" },
  { name: "PublicNode", network: "mainnet", endpoint: "https://solana.publicnode.com" },
  { name: "Ankr", network: "mainnet", endpoint: "https://rpc.ankr.com/solana" },
]

function Led({ status }: { status: Status }) {
  const color = {
    online: "bg-success",
    slow: "bg-warning",
    offline: "bg-error",
    checking: "bg-muted-foreground/40 animate-pulse",
  }[status]
  return <span className={cn("inline-block size-2.5 shrink-0", color)} aria-hidden />
}

async function ping(endpoint: string) {
  const start = Date.now()
  const response = await fetch("/api/check-rpc", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint }),
    signal: AbortSignal.timeout(12000),
  })
  const data = await response.json()
  const latencyMs = typeof data.latencyMs === "number" ? data.latencyMs : Date.now() - start
  return { data, latencyMs }
}

function toRow(ep: Endpoint, data: Record<string, unknown>, latencyMs: number): Row {
  const ok = Boolean(data.success)
  const status: Status = !ok ? "offline" : latencyMs > 2000 ? "slow" : "online"
  return {
    name: ep.name,
    network: ep.network,
    endpoint: ep.endpoint,
    status,
    latencyMs,
    slot: typeof data.slot === "number" ? data.slot : undefined,
    blockHeight: typeof data.blockHeight === "number" ? data.blockHeight : undefined,
    health: typeof data.health === "string" ? data.health : null,
    lastChecked: new Date(),
  }
}

export function Board() {
  const [rows, setRows] = useState<Row[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [updated, setUpdated] = useState<Date>(new Date())
  const [customUrl, setCustomUrl] = useState("")
  const [custom, setCustom] = useState<Row | null>(null)
  const [customBusy, setCustomBusy] = useState(false)
  const [customError, setCustomError] = useState<string | null>(null)

  const scan = async () => {
    setRefreshing(true)
    setRows(
      PUBLIC.map((ep) => ({
        name: ep.name,
        network: ep.network,
        endpoint: ep.endpoint,
        status: "checking",
        lastChecked: new Date(),
      })),
    )
    const results = await Promise.all(
      PUBLIC.map(async (ep) => {
        try {
          const { data, latencyMs } = await ping(ep.endpoint)
          return toRow(ep, data, latencyMs)
        } catch {
          return {
            name: ep.name,
            network: ep.network,
            endpoint: ep.endpoint,
            status: "offline" as const,
            lastChecked: new Date(),
          }
        }
      }),
    )
    setRows(results)
    setUpdated(new Date())
    setRefreshing(false)
  }

  useEffect(() => {
    scan()
    const id = setInterval(scan, 30000)
    return () => clearInterval(id)
  }, [])

  const checkCustom = async () => {
    const endpoint = customUrl.trim()
    if (!endpoint) return
    setCustomBusy(true)
    setCustomError(null)
    try {
      const { data, latencyMs } = await ping(endpoint)
      if (!data.success) {
        setCustom({
          name: "custom",
          network: "mainnet",
          endpoint,
          status: "offline",
          latencyMs,
          lastChecked: new Date(),
        })
        setCustomError(typeof data.error === "string" ? data.error : "offline")
      } else {
        setCustom(toRow({ name: "custom", network: "mainnet", endpoint }, data, latencyMs))
      }
    } catch {
      setCustomError("timeout")
      setCustom(null)
    } finally {
      setCustomBusy(false)
    }
  }

  const statsFor = (network: Network) => {
    const list = rows.filter((r) => r.network === network)
    return {
      online: list.filter((r) => r.status === "online").length,
      slow: list.filter((r) => r.status === "slow").length,
      offline: list.filter((r) => r.status === "offline").length,
      total: list.length,
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <img
              src="/brand/rpc-gutter.svg"
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0"
            />
            <div>
              <p className="font-semibold text-lg leading-none tracking-normal">rpccheck</p>
              <p className="mt-1 text-sm text-muted-foreground">Ping any Solana RPC</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground">
              {updated.toLocaleTimeString()}
            </span>
            <button
              type="button"
              onClick={scan}
              disabled={refreshing}
              className="inline-flex min-h-11 items-center gap-2 border border-border px-3 text-sm text-foreground hover:bg-muted touch-manipulation"
            >
              <RefreshCw className={cn("size-4", refreshing && "animate-spin")} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <form
          className="mb-8 border border-border bg-card p-4 sm:p-5"
          onSubmit={(e) => {
            e.preventDefault()
            void checkCustom()
          }}
        >
          <label htmlFor="rpc-url" className="block text-sm text-muted-foreground">
            Endpoint
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="rpc-url"
              type="url"
              inputMode="url"
              autoComplete="off"
              placeholder="https://your-rpc.example"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="min-h-12 w-full flex-1 border border-input bg-background px-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <button
              type="submit"
              disabled={customBusy || !customUrl.trim()}
              className="inline-flex min-h-12 items-center justify-center bg-primary px-5 text-base font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 touch-manipulation"
            >
              {customBusy ? "Checking" : "Check"}
            </button>
          </div>
          {customError ? <p className="mt-3 text-sm text-error">{customError}</p> : null}
          {custom && !customError ? (
            <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-sm sm:grid-cols-4">
              <div>
                <p className="text-muted-foreground">status</p>
                <p className="mt-1 flex items-center gap-2 text-foreground">
                  <Led status={custom.status} />
                  {custom.status}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">latency</p>
                <p className="mt-1">{custom.latencyMs != null ? `${custom.latencyMs}ms` : "-"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">slot</p>
                <p className="mt-1">{custom.slot != null ? custom.slot.toLocaleString() : "-"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">height</p>
                <p className="mt-1">
                  {custom.blockHeight != null ? custom.blockHeight.toLocaleString() : "-"}
                </p>
              </div>
            </div>
          ) : null}
        </form>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {(["mainnet", "devnet", "testnet"] as const).map((network) => {
            const s = statsFor(network)
            const pct = s.total ? Math.round(((s.online + s.slow) / s.total) * 100) : 0
            return (
              <div key={network} className="border border-border bg-card p-4">
                <p className="text-sm capitalize text-muted-foreground">{network}</p>
                <p className="mt-2 font-mono text-3xl text-foreground">{pct}%</p>
                <div className="mt-3 flex justify-between text-xs">
                  <span className="text-success">online {s.online}</span>
                  <span className="text-warning">slow {s.slow}</span>
                  <span className="text-error">offline {s.offline}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="border border-border bg-card">
          <div className="border-b border-border px-4 py-3 sm:px-6">
            <p className="text-sm text-foreground">Public endpoints</p>
          </div>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="border-b border-border text-xs text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 font-medium">Provider</th>
                  <th className="px-6 py-3 font-medium">Network</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Latency</th>
                  <th className="px-6 py-3 font-medium">Slot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((row) => (
                  <tr key={`${row.name}-${row.network}`}>
                    <td className="px-6 py-4 text-sm">{row.name}</td>
                    <td className="px-6 py-4 text-sm capitalize text-muted-foreground">{row.network}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 text-sm">
                        {row.status === "online" ? (
                          <CheckCircle className="size-4 text-success" />
                        ) : row.status === "slow" ? (
                          <Clock className="size-4 text-warning" />
                        ) : row.status === "offline" ? (
                          <AlertCircle className="size-4 text-error" />
                        ) : (
                          <Activity className="size-4 animate-pulse text-muted-foreground" />
                        )}
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm">
                      {row.latencyMs != null ? `${row.latencyMs}ms` : "-"}
                    </td>
                    <td className="px-6 py-4 font-mono text-sm">
                      {row.slot != null ? row.slot.toLocaleString() : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="divide-y divide-border md:hidden">
            {rows.map((row) => (
              <div key={`${row.name}-${row.network}-m`} className="px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">{row.name}</p>
                  <span className="inline-flex items-center gap-2 text-sm">
                    <Led status={row.status} />
                    {row.status}
                  </span>
                </div>
                <p className="mt-1 text-xs capitalize text-muted-foreground">{row.network}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-sm">
                  <span>{row.latencyMs != null ? `${row.latencyMs}ms` : "-"}</span>
                  <span className="text-right">{row.slot != null ? row.slot.toLocaleString() : "-"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
