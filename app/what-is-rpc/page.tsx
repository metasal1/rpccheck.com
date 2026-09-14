import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { WhatIsRpc, rpcFaqJsonLd } from "@/components/what-is-rpc"

export const metadata: Metadata = {
  title: "What is an RPC",
  description:
    "What is an RPC? A Solana RPC endpoint is the HTTPS JSON-RPC URL wallets and dapps use to read slots, send transactions, and check health.",
  alternates: { canonical: "https://rpccheck.com/what-is-rpc" },
  openGraph: {
    title: "What is an RPC",
    description: "Solana RPC explained. Ping any endpoint for slot, lag, and latency.",
    url: "https://rpccheck.com/what-is-rpc",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
}

export default function WhatIsRpcPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rpcFaqJsonLd) }}
      />
      <WhatIsRpc heading="h1" />
      <SiteFooter />
    </>
  )
}
