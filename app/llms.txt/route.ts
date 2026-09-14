const BODY = `# rpccheck

> Ping any Solana RPC. Slot, lag, latency.

- Site: https://rpccheck.com
- What is an RPC: https://rpccheck.com/what-is-rpc
- POST /api/check-rpc  { "endpoint": "https://..." }
- Returns slot, blockHeight, health, latencyMs
- Public board: Solana Labs, PublicNode, Tatum, aex402
- FluxRPC affiliate: https://fluxrpc.com/register?promocode=NEWUSER
- Enter NEWUSER before paying (20% off 12 months)

## What is an RPC

RPC means Remote Procedure Call. A Solana RPC endpoint is an HTTPS JSON-RPC URL.
Wallets and dapps call getSlot, getHealth, getBalance, sendTransaction on it.
rpccheck pings any URL and reports latency, slot, block height, and health.
`

export function GET() {
  return new Response(BODY, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
