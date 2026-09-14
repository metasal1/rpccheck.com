import { DIRECTORY_PROVIDERS, socialFor, type ProviderSocial } from "@/lib/providers"

function Socials({ p }: { p: ProviderSocial }) {
  const href = p.signup || p.site
  return (
    <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
      <a
        href={href}
        target="_blank"
        rel={p.signup ? "noopener noreferrer sponsored" : "noopener noreferrer"}
        className="text-foreground hover:underline"
      >
        {p.name}
      </a>
      <a
        href={`https://x.com/${p.x}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-muted-foreground hover:text-foreground"
      >
        @{p.x}
      </a>
    </span>
  )
}

export function NamedProvider({ name }: { name: string }) {
  const p = socialFor(name)
  if (!p) return <span>{name}</span>
  return <Socials p={p} />
}

export function ProviderDirectory() {
  return (
    <div className="mt-8 border border-border bg-card">
      <div className="border-b border-border px-4 py-3 sm:px-6">
        <p className="text-sm text-foreground">Paid and key RPCs</p>
        <p className="mt-1 text-xs text-muted-foreground">Not pinged here. Site + X.</p>
      </div>
      <ul className="divide-y divide-border">
        {DIRECTORY_PROVIDERS.map((p) => (
          <li
            key={p.name}
            className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <Socials p={p} />
            <a
              href={p.signup || p.site}
              target="_blank"
              rel={p.signup ? "noopener noreferrer sponsored" : "noopener noreferrer"}
              className="truncate text-xs text-muted-foreground hover:text-foreground"
            >
              {(p.signup || p.site).replace(/^https:\/\/(www\.)?/, "")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
