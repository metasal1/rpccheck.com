const BODY = `# rpccheck

> Ping any Solana RPC. Slot, lag, latency.

- Site: https://rpccheck.com
- POST /api/check-rpc  { "endpoint": "https://..." }
- Returns slot, blockHeight, health, latencyMs
`

export function GET() {
  return new Response(BODY, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
