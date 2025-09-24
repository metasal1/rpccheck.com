import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
// import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "RPC Check for Solana",
  description:
    "Monitor Solana RPC endpoints across Mainnet, Devnet, and Testnet networks in real-time. Check response times, block heights, and network health for all major providers.",
  keywords: ["Solana", "RPC", "blockchain", "monitoring", "status", "mainnet", "devnet", "testnet"],
  authors: [{ name: "metasal.xyz", url: "https://metasal.xyz" }],
  creator: "metasal.xyz",
  openGraph: {
    title: "RPC Check for Solana",
    description: "Monitor Solana RPC endpoints across all networks in real-time",
    siteName: "RPC Check",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RPC Check for Solana",
    description: "Monitor Solana RPC endpoints across all networks in real-time",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
