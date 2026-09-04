export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
          <a
            href="https://solana.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Powered by Solana"
          >
            <img
              src="/brand/powered-by-white.svg"
              alt="Powered by Solana"
              height={22}
              className="h-[22px] w-auto opacity-90"
            />
          </a>
          <a
            href="https://milysec.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Made by Milysec.com"
          >
            <img
              src="/images/badges/made-by-milysec-black-v2.svg"
              alt="Made by Milysec"
              height={28}
              className="h-7 w-auto"
            />
          </a>
        </div>
        <a
          href="https://github.com/metasal1/rpccheck.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
