"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

export function DocsToc() {
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)] pb-10">
      <div className="space-y-2">
        <p className="font-medium">On This Page</p>
        <ul className="m-0 list-none">
          <li className="mt-0 pt-2">
            <a
              href="#overview"
              className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Overview
            </a>
          </li>
          <li className="mt-0 pt-2">
            <a
              href="#installation"
              className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Installation
            </a>
          </li>
          <li className="mt-0 pt-2">
            <a
              href="#usage"
              className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Usage
            </a>
          </li>
        </ul>
      </div>
    </ScrollArea>
  )
}