import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Layers, Zap, Shield, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background gradients for glassmorphism effect */}
      <div className="pointer-events-none fixed inset-0 flex justify-center z-[-1]">
        <div className="absolute top-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute top-[40%] left-[-10%] h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="space-y-6 pb-8 pt-24 md:pb-12 md:pt-32 lg:py-48 relative overflow-hidden">
          <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-6 text-center px-4 relative z-10">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-md transition-all hover:bg-primary/10">
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Introducing Glass UI for shadcn</span>
            </div>
            
            <h1 className="font-sans text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Build beautiful interfaces with glassmorphism.
            </h1>
            
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              A premium component library for shadcn/ui featuring stunning glassmorphism design techniques. Accessible, customizable, and ready to drop into your Next.js applications.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row items-center">
              <Button size="lg" className="h-12 px-8 bg-gradient-to-b from-primary/90 to-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_4px_0_rgba(0,0,0,0.1)] transition-all active:shadow-none border border-primary/20" asChild>
                <Link href="/docs">Get Started</Link>
              </Button>
              <Button size="lg" variant="ghost" className="h-12 px-8 text-muted-foreground hover:text-foreground hover:bg-transparent" asChild>
                <Link href="/components">Browse Components</Link>
              </Button>
            </div>
          </div>
          
          {/* Decorative glass elements in hero */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-primary/20 blur-[100px] opacity-40 pointer-events-none z-0"></div>
          <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-72 h-72 rounded-full bg-blue-500/20 blur-[100px] opacity-40 pointer-events-none z-0"></div>
        </section>

      </main>

      <Footer />
    </div>
  )
}