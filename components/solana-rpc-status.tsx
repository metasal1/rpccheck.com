"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RefreshCw, Activity, AlertCircle, CheckCircle, Clock, Plus, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface RPCProvider {
  name: string
  mainnet?: string
  devnet?: string
  testnet?: string
  website?: string
}

interface RPCStatus {
  provider: string
  network: "mainnet" | "devnet" | "testnet"
  endpoint: string
  status: "online" | "offline" | "slow" | "checking"
  responseTime?: number
  blockHeight?: number
  lastChecked: Date
}

const RPC_PROVIDERS: RPCProvider[] = [
  {
    name: "Solana Labs",
    mainnet: "https://api.mainnet-beta.solana.com",
    devnet: "https://api.devnet.solana.com",
    testnet: "https://api.testnet.solana.com",
    website: "https://solana.com",
  },
  {
    name: "Alchemy",
    mainnet: "https://solana-mainnet.g.alchemy.com/v2/demo",
    devnet: "https://solana-devnet.g.alchemy.com/v2/demo",
    website: "https://alchemy.com",
  },
  {
    name: "QuickNode",
    mainnet: "https://api.mainnet-beta.solana.com",
    devnet: "https://api.devnet.solana.com",
    website: "https://quicknode.com",
  },
  {
    name: "Helius",
    mainnet: "https://mainnet.helius-rpc.com",
    devnet: "https://devnet.helius-rpc.com",
    website: "https://helius.xyz",
  },
  {
    name: "GenesysGo",
    mainnet: "https://ssc-dao.genesysgo.net",
    devnet: "https://devnet.genesysgo.net",
    website: "https://genesysgo.com",
  },
  {
    name: "Ankr",
    mainnet: "https://rpc.ankr.com/solana",
    devnet: "https://rpc.ankr.com/solana_devnet",
    website: "https://ankr.com",
  },
  {
    name: "Syndica",
    mainnet: "https://solana-api.syndica.io/access-token/YOUR_ACCESS_TOKEN/rpc",
    devnet: "https://solana-devnet.syndica.io/access-token/YOUR_ACCESS_TOKEN/rpc",
    website: "https://syndica.io",
  },
  {
    name: "Triton",
    mainnet: "https://solana-mainnet-rpc.allthatnode.com",
    devnet: "https://solana-devnet-rpc.allthatnode.com",
    website: "https://triton.one",
  },
]

export function SolanaRPCStatus() {
  const [rpcStatuses, setRpcStatuses] = useState<RPCStatus[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [isProviderDialogOpen, setIsProviderDialogOpen] = useState(false)

  const checkRPCStatus = async (
    provider: string,
    network: "mainnet" | "devnet" | "testnet",
    endpoint: string,
  ): Promise<RPCStatus> => {
    const startTime = Date.now()

    try {
      const response = await fetch("/api/check-rpc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint }),
        signal: AbortSignal.timeout(10000), // 10 second timeout
      })

      const responseTime = Date.now() - startTime

      if (response.ok) {
        const data = await response.json()
        return {
          provider,
          network,
          endpoint,
          status: responseTime > 2000 ? "slow" : "online",
          responseTime,
          blockHeight: data.blockHeight,
          lastChecked: new Date(),
        }
      } else {
        return {
          provider,
          network,
          endpoint,
          status: "offline",
          responseTime,
          lastChecked: new Date(),
        }
      }
    } catch (error) {
      return {
        provider,
        network,
        endpoint,
        status: "offline",
        responseTime: Date.now() - startTime,
        lastChecked: new Date(),
      }
    }
  }

  const refreshStatuses = async () => {
    setIsRefreshing(true)

    // Set all to checking state first
    const checkingStatuses: RPCStatus[] = []
    RPC_PROVIDERS.forEach((provider) => {
      if (provider.mainnet) {
        checkingStatuses.push({
          provider: provider.name,
          network: "mainnet",
          endpoint: provider.mainnet,
          status: "checking",
          lastChecked: new Date(),
        })
      }
      if (provider.devnet) {
        checkingStatuses.push({
          provider: provider.name,
          network: "devnet",
          endpoint: provider.devnet,
          status: "checking",
          lastChecked: new Date(),
        })
      }
      if (provider.testnet) {
        checkingStatuses.push({
          provider: provider.name,
          network: "testnet",
          endpoint: provider.testnet,
          status: "checking",
          lastChecked: new Date(),
        })
      }
    })

    setRpcStatuses(checkingStatuses)

    // Check all RPCs
    const statusPromises = checkingStatuses.map((status) =>
      checkRPCStatus(status.provider, status.network, status.endpoint),
    )

    try {
      const results = await Promise.all(statusPromises)
      setRpcStatuses(results)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Error checking RPC statuses:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    refreshStatuses()
    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshStatuses, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: RPCStatus["status"]) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "slow":
        return <Clock className="h-4 w-4 text-warning" />
      case "offline":
        return <AlertCircle className="h-4 w-4 text-error" />
      case "checking":
        return <Activity className="h-4 w-4 text-muted-foreground animate-pulse" />
    }
  }

  const getStatusBadge = (status: RPCStatus["status"]) => {
    const variants = {
      online: "bg-success/20 text-success border-success/30",
      slow: "bg-warning/20 text-warning border-warning/30",
      offline: "bg-error/20 text-error border-error/30",
      checking: "bg-muted/20 text-muted-foreground border-muted/30",
    }

    return (
      <Badge variant="outline" className={cn("capitalize", variants[status])}>
        {getStatusIcon(status)}
        <span className="ml-1">{status}</span>
      </Badge>
    )
  }

  const getNetworkStats = (network: "mainnet" | "devnet" | "testnet") => {
    const networkStatuses = rpcStatuses.filter((s) => s.network === network)
    const online = networkStatuses.filter((s) => s.status === "online").length
    const slow = networkStatuses.filter((s) => s.status === "slow").length
    const offline = networkStatuses.filter((s) => s.status === "offline").length
    const total = networkStatuses.length

    return { online, slow, offline, total }
  }

  const networks = ["mainnet", "devnet", "testnet"] as const

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">RPCcheck.com</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Real-time monitoring of Solana RPC endpoints across all networks
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</div>
              <Button onClick={refreshStatuses} disabled={isRefreshing} variant="outline" size="sm">
                <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Network Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {networks.map((network) => {
            const stats = getNetworkStats(network)
            const healthPercentage = stats.total > 0 ? Math.round(((stats.online + stats.slow) / stats.total) * 100) : 0

            return (
              <Card key={network} className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg capitalize text-card-foreground">{network}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Health</span>
                      <span className="text-2xl font-mono font-semibold text-card-foreground">{healthPercentage}%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-success">Online: {stats.online}</span>
                        <span className="text-warning">Slow: {stats.slow}</span>
                        <span className="text-error">Offline: {stats.offline}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-success h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(stats.online / stats.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* RPC Status Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">RPC Endpoints</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-left">
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground">Provider</th>
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground">Network</th>
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground">Response Time</th>
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground">Block Height</th>
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground">Last Checked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rpcStatuses.map((status, index) => (
                    <tr key={index} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-card-foreground">{status.provider}</div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="capitalize">
                          {status.network}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(status.status)}</td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-card-foreground">
                          {status.responseTime ? `${status.responseTime}ms` : "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-card-foreground">
                          {status.blockHeight ? status.blockHeight.toLocaleString() : "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">{status.lastChecked.toLocaleTimeString()}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Built by{" "}
              <a
                href="https://metasal.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                metasal.xyz
              </a>{" "}
              •{" "}
              <a
                href="https://github.com/metasal1/rpccheck.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                GitHub
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-1">Request features or report issues on GitHub</p>
          </div>
        </div>
      </footer>

      {/* Floating action button for RPC providers */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={isProviderDialogOpen} onOpenChange={setIsProviderDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Your RPC
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                RPC Provider Contact
              </DialogTitle>
              <DialogDescription className="text-left space-y-3 pt-2">
                <p>Are you an RPC provider and want your endpoints monitored on this status page?</p>
                <p className="font-medium text-foreground">
                  Contact us to get your RPC endpoints added to our monitoring system.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <p className="text-sm font-medium text-foreground mb-2">Contact Information:</p>
                  <a
                    href="https://t.me/metasal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    <MessageCircle className="h-4 w-4" />
                    t.me/metasal
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">
                  Please include your provider name, supported networks, and endpoint URLs when contacting us.
                </p>
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end pt-4">
              <Button onClick={() => setIsProviderDialogOpen(false)} variant="outline">
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
