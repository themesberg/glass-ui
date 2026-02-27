import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Full-height vertical lines spanning the entire document */}
      <div className="pointer-events-none absolute inset-0 flex justify-center z-50">
        <div className="container mx-auto h-full border-x border-border/50" />
      </div>

      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="border-y border-border relative overflow-hidden">
          <div className="container mx-auto flex flex-col items-start gap-8 text-left px-4 md:px-8 py-24 md:py-32 lg:py-48 relative z-10">
            <h1 className="font-sans text-6xl font-extrabold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl lg:leading-[0.9] max-w-7xl">
              Glass UI
            </h1>
            
            <p className="max-w-3xl leading-normal text-muted-foreground text-xl sm:text-2xl md:text-3xl font-medium">
              Open-source UI component library for shadcn/ui
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row items-start">
              <Button size="lg" className="h-16 px-10 text-lg md:text-xl rounded-2xl bg-linear-to-b from-primary/90 to-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_4px_0_rgba(0,0,0,0.1)] transition-all active:shadow-none border border-primary/20" asChild>
                <Link href="/docs">Get Started</Link>
              </Button>
              <Button size="lg" variant="ghost" className="h-16 px-10 text-lg md:text-xl rounded-2xl text-muted-foreground hover:text-foreground hover:bg-transparent" asChild>
                <Link href="/components">Browse Components</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
