import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, value, ...props }, ref) => {
    return (
      <input
        type={type}
        value={value ?? ""}
        className={cn(
          "flex h-12 w-full bg-transparent px-3 py-1 text-black transition-all duration-300 border-0 border-b border-gray-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
