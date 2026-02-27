import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 bg-background/40 backdrop-blur-md supports-[backdrop-filter]:bg-background/20">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Glass UI - All rights reserved.
          Built by <Link href="https://bergside.com" target="_blank" className="font-medium underline underline-offset-4">Bergside LLC</Link>.
        </p>
      </div>
    </footer>
  )
}