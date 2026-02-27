"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const items = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
    ]
  },
  {
    title: "Components",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Navbar", href: "/docs/components/navbar" },
    ]
  }
]

export function DocsSidebarNav() {
  const pathname = usePathname()

  return (
    <ScrollArea className="h-full py-6 pr-6 lg:py-8">
      <div className="w-full">
        {items.map((item, index) => (
          <div key={index} className="pb-4">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              {item.title}
            </h4>
            {item.items?.length ? (
              <div className="grid grid-flow-row auto-rows-max text-sm">
                {item.items.map((subItem, index) => (
                  <Link
                    key={index}
                    href={subItem.href}
                    className={cn(
                      "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                      pathname === subItem.href
                        ? "font-medium text-foreground bg-primary/10"
                        : "text-muted-foreground"
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}