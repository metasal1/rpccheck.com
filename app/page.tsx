import { Board } from "@/components/board"
import { SiteFooter } from "@/components/site-footer"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "rpccheck",
  url: "https://rpccheck.com",
  description: "Ping any Solana RPC. Slot, lag, latency.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
}

export default function Home() {
  return (
    <>
      <h1 className="sr-only">rpccheck. Ping any Solana RPC.</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Board />
      <SiteFooter />
    </>
  )
}
