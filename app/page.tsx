import { SolanaRPCStatus } from "@/components/solana-rpc-status"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <SolanaRPCStatus />
    </main>
  )
}
