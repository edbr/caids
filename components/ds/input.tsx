import * as React from "react";
import { cn } from "@/lib/utils";

export function DSInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-border bg-background px-3 py-2 text-sm",
        "text-foreground placeholder:text-muted-foreground",
        "outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
        className
      )}
      {...props}
    />
  );
}
