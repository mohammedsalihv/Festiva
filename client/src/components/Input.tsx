import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, value, ...props }, ref) => {
    return (
      <input
        type={type}
        value={value ?? ""}  // Ensure value is never null
        className={cn(
          "flex h-12 w-full bg-transparent px-3 py-1 text-black transition-all duration-300 border-b-2 border-black/40 hover:border-black/80 focus:border-black focus:border-2",
          className
        )}
        ref={ref}
        {...props}
        required
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
