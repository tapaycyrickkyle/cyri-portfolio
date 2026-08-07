import * as React from "react";

import { cn } from "@/lib/utils";

export function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full border border-black bg-white px-3 py-2 text-base text-black transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}
