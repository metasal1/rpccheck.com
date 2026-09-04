import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import Script from "next/script"
import "./globals.css"

const SITE = "https://rpccheck.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "rpccheck",
  description: "Ping any Solana RPC. Slot, lag, latency.",
  keywords: ["Solana", "RPC", "latency", "slot", "mainnet"],
  authors: [{ name: "Milysec", url: "https://milysec.com" }],
  creator: "Milysec",
  openGraph: {
    title: "rpccheck",
    description: "Ping any Solana RPC. Slot, lag, latency.",
    url: SITE,
    siteName: "rpccheck",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "rpccheck",
    description: "Ping any Solana RPC. Slot, lag, latency.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-W44S4JB071" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-W44S4JB071');
        `}</Script>
      </body>
    </html>
  )
}
