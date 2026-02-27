import * as React from "react";
import { cn } from "@/lib/utils";

export const primaryBtn =
  "group inline-flex items-center gap-1.5 rounded-md border border-numo-blue-500 bg-numo-blue-600 px-5 py-2 text-sm font-medium text-white transition-all duration-200 ease-out hover:border-numo-blue-400 hover:bg-numo-blue-600 hover:shadow-[0_0_0_1px_hsl(var(--numo-blue-400)/0.35),0_8px_18px_hsl(var(--numo-blue-500)/0.28)] active:opacity-95";

export const secondaryBtn =
  "group inline-flex items-center gap-1.5 rounded-md border border-numo-blue-500 bg-white px-5 py-2 text-sm font-medium text-numo-blue-600 transition-all duration-200 ease-out hover:border-numo-blue-600 hover:bg-numo-blue-400/10 hover:text-numo-blue-700 active:opacity-95";

export function PrimaryBtn({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cn(primaryBtn, className)} {...props} />;
}

export function SecondaryBtn({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cn(secondaryBtn, className)} {...props} />;
}
