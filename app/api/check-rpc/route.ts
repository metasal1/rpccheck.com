import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { endpoint } = await request.json()

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint is required" }, { status: 400 })
    }

    // Create the RPC request payload
    const rpcPayload = {
      jsonrpc: "2.0",
      id: 1,
      method: "getSlot",
      params: [],
    }

    // Make the RPC call with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rpcPayload),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        return NextResponse.json(
          {
            error: "RPC call failed",
            status: response.status,
          },
          { status: 500 },
        )
      }

      const data = await response.json()

      if (data.error) {
        return NextResponse.json(
          {
            error: "RPC error",
            rpcError: data.error,
          },
          { status: 500 },
        )
      }

      // Get additional info like block height
      const blockHeightPayload = {
        jsonrpc: "2.0",
        id: 2,
        method: "getBlockHeight",
        params: [],
      }

      let blockHeight = null
      try {
        const blockResponse = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blockHeightPayload),
          signal: AbortSignal.timeout(3000),
        })

        if (blockResponse.ok) {
          const blockData = await blockResponse.json()
          if (!blockData.error) {
            blockHeight = blockData.result
          }
        }
      } catch (error) {
        // Block height is optional, continue without it
      }

      return NextResponse.json({
        success: true,
        slot: data.result,
        blockHeight,
      })
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error && error.name === "AbortError") {
        return NextResponse.json({ error: "Request timeout" }, { status: 408 })
      }

      return NextResponse.json(
        {
          error: "Network error",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    )
  }
}
