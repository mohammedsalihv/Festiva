import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
    className={cn(
  "flex h-12 w-full bg-transparent px-3 py-1 text-black transition-all duration-300 border-0 border-b border-gray-300 focus:border-b-2 focus:border-black focus:outline-none focus:ring-0",
  className
)}

      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
