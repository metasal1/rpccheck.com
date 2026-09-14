import Link from "next/link"
import { FLUX_SIGNUP, FLUX_CODE } from "@/lib/fluxrpc"

const faqs = [
  {
    q: "What is an RPC?",
    a: "RPC means Remote Procedure Call. Your wallet or app sends a JSON request to a node and gets chain data back. On Solana that is JSON-RPC over HTTPS.",
  },
  {
    q: "What is a Solana RPC endpoint?",
    a: "An HTTPS URL that speaks Solana JSON-RPC. Example methods: getSlot, getHealth, getBalance, sendTransaction. Wallets, bots, and dapps all talk to one.",
  },
  {
    q: "Why ping an RPC?",
    a: "Public nodes drop, lag, or rate-limit. A ping that returns slot, block height, and latency tells you if the node is live and how far behind the tip it is.",
  },
  {
    q: "Public vs paid RPC?",
    a: "Public endpoints are fine for a check. Production traffic needs a paid plan. FluxRPC is bandwidth-priced. Use code NEWUSER before you pay for 20% off for 12 months.",
  },
]

export function WhatIsRpc({ heading = "h2" as "h1" | "h2" }) {
  const Heading = heading
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Heading className="text-2xl font-semibold tracking-normal">What is an RPC?</Heading>
      <div className="mt-4 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
        <p>
          An RPC is how software talks to a blockchain node without running one. You POST JSON to an
          HTTPS URL. The node runs the method and returns the result. That URL is the RPC endpoint.
        </p>
        <p>
          Solana apps use JSON-RPC. A wallet asking for a balance, a bot sending a swap, a status
          page calling getSlot: all of that is RPC. If the endpoint is slow, your app is slow. If it
          is offline, nothing lands.
        </p>
        <p>
          rpccheck pings any Solana RPC you paste. It reports latency, current slot, block height,
          and health. Use it to compare public nodes or to vet a paid URL before you ship.
        </p>
        <p>
          Public RPCs (Solana Labs, PublicNode, Tatum) are rate-limited and often lag. For
          production, use a paid provider.{" "}
          <a href={FLUX_SIGNUP} className="text-foreground underline underline-offset-2" rel="noopener noreferrer sponsored">
            FluxRPC
          </a>{" "}
          : enter <span className="font-mono text-foreground">{FLUX_CODE}</span> before you pay.
        </p>
      </div>

      <h2 className="mt-10 text-xl font-semibold">FAQ</h2>
      <dl className="mt-4 max-w-3xl divide-y divide-border border border-border">
        {faqs.map((item) => (
          <div key={item.q} className="px-4 py-4 sm:px-5">
            <dt className="text-sm font-medium text-foreground">{item.q}</dt>
            <dd className="mt-2 text-sm leading-6 text-muted-foreground">{item.a}</dd>
          </div>
        ))}
      </dl>
      {heading === "h1" ? (
        <p className="mt-6 text-sm text-muted-foreground">
          <Link href="/" className="underline underline-offset-2">
            Back to rpccheck
          </Link>
        </p>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">
          <Link href="/what-is-rpc" className="underline underline-offset-2">
            What is an RPC, full page
          </Link>
        </p>
      )}
    </article>
  )
}

export const rpcFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}
