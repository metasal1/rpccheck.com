import { Board } from "@/components/board"
import { SiteFooter } from "@/components/site-footer"
import { WhatIsRpc, rpcFaqJsonLd } from "@/components/what-is-rpc"

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "rpccheck",
    url: "https://rpccheck.com",
    description: "Ping any Solana RPC. Slot, lag, latency. What is an RPC, explained.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
  },
  rpcFaqJsonLd,
]

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="sr-only">
        <h1>rpccheck. Ping any Solana RPC. What is an RPC?</h1>
      </header>
      <Board />
      <WhatIsRpc heading="h2" />
      <SiteFooter />
    </>
  )
}
