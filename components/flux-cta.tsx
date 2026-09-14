"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { FLUX_CODE, FLUX_SIGNUP } from "@/lib/fluxrpc"

export function FluxCta() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(FLUX_CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mb-8 border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">FluxRPC</p>
          <p className="mt-1 text-sm text-muted-foreground">
            20% off any plan for 12 months. Enter code <span className="font-mono text-foreground">{FLUX_CODE}</span>{" "}
            before you pay.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-border px-4 text-base font-mono text-foreground hover:bg-muted touch-manipulation"
            aria-label={`Copy code ${FLUX_CODE}`}
          >
            {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
            {FLUX_CODE}
          </button>
          <a
            href={FLUX_SIGNUP}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex min-h-12 items-center justify-center bg-primary px-5 text-base font-medium text-primary-foreground hover:bg-primary/90 touch-manipulation"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}
