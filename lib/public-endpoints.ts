export type Network = "mainnet" | "devnet" | "testnet"

export type PublicEndpoint = {
  name: string
  network: Network
  endpoint: string
}

export const PUBLIC_ENDPOINTS: PublicEndpoint[] = [
  { name: "Solana Labs", network: "mainnet", endpoint: "https://api.mainnet-beta.solana.com" },
  { name: "Solana Labs", network: "devnet", endpoint: "https://api.devnet.solana.com" },
  { name: "Solana Labs", network: "testnet", endpoint: "https://api.testnet.solana.com" },
  { name: "PublicNode", network: "mainnet", endpoint: "https://solana-rpc.publicnode.com" },
  { name: "Tatum", network: "mainnet", endpoint: "https://solana-mainnet.gateway.tatum.io" },
  { name: "Tatum", network: "devnet", endpoint: "https://solana-devnet.gateway.tatum.io" },
  { name: "aex402", network: "mainnet", endpoint: "https://rpc.aex402.com/" },
]
