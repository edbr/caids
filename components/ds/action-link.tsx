import * as React from "react";
import { cn } from "@/lib/utils";

export function DSActionLink({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "text-sm font-medium text-muted-foreground",
        "hover:text-foreground hover:underline underline-offset-4",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
        className
      )}
      {...props}
    />
  );
}
