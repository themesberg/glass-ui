import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DocsSidebarNav } from "@/components/docs-sidebar-nav"
import { DocsToc } from "@/components/docs-toc"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Background gradients for glassmorphism effect */}
      <div className="pointer-events-none fixed inset-0 flex justify-center z-[-1]">
        <div className="absolute top-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>
      
      <Navbar />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 mx-auto px-4">
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
          <DocsSidebarNav />
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_250px]">
          <div className="mx-auto w-full min-w-0">
            {children}
          </div>
          <div className="hidden text-sm xl:block">
            <div className="sticky top-16 -mt-10 pt-4">
              <DocsToc />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}