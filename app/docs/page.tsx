import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocsPage() {
  return (
    <div className="space-y-10 pb-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Introduction
        </h1>
        <p className="text-xl text-muted-foreground">
          Welcome to the Glass UI documentation. Learn how to install and use our beautiful glassmorphism components.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="overview" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Overview
        </h2>
        <p className="leading-7">
          Glass UI is a premium component library built on top of shadcn/ui. It brings the popular glassmorphism aesthetic to your Next.js applications with accessible, customizable, and ready-to-use components.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Installation
        </h2>
        <p className="leading-7">
          Getting started is easy. You can install our components using the CLI or by copying and pasting the code directly into your project.
        </p>
        <div className="my-6 w-full overflow-hidden rounded-md border bg-muted/50 backdrop-blur-sm">
          <div className="flex px-4 py-3">
            <code className="relative rounded bg-transparent font-mono text-sm font-semibold">
              npm install glass-ui-components
            </code>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Usage
        </h2>
        <p className="leading-7">
          Here is a simple example of how to use our button component:
        </p>
        
        <Card className="my-6 bg-primary/5 backdrop-blur-md border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle>Glass Button</CardTitle>
            <CardDescription>A button with a glassmorphism effect.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-10">
            <Button size="lg" className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
              Glass Button
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}