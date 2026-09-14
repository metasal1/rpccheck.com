import { FLUX_SIGNUP } from "@/lib/fluxrpc"

export type ProviderSocial = {
  name: string
  site: string
  x: string
  signup?: string
}

export const PROVIDER_SOCIALS: ProviderSocial[] = [
  { name: "Solana Labs", site: "https://solana.com", x: "solana" },
  { name: "PublicNode", site: "https://solana.publicnode.com", x: "Allnodes" },
  { name: "Tatum", site: "https://tatum.io", x: "tatum_io" },
  { name: "aex402", site: "https://rpc.aex402.com", x: "aex402" },
  { name: "FluxRPC", site: "https://fluxrpc.com", x: "FluxRPC", signup: FLUX_SIGNUP },
  { name: "Helius", site: "https://www.helius.dev", x: "Helius" },
  { name: "Ankr", site: "https://www.ankr.com", x: "ankr" },
  { name: "Triton", site: "https://www.triton.one", x: "rpcpool" },
  { name: "Alchemy", site: "https://www.alchemy.com", x: "Alchemy" },
  { name: "QuickNode", site: "https://www.quicknode.com", x: "QuickNode" },
  { name: "Chainstack", site: "https://chainstack.com", x: "ChainstackHQ" },
  { name: "dRPC", site: "https://drpc.org", x: "drpc_org" },
]

const PING_NAMES = new Set(["Solana Labs", "PublicNode", "Tatum", "aex402"])

export function socialFor(name: string) {
  return PROVIDER_SOCIALS.find((p) => p.name === name)
}

export const DIRECTORY_PROVIDERS = PROVIDER_SOCIALS.filter((p) => !PING_NAMES.has(p.name))
