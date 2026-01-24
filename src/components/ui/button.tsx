import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold uppercase tracking-wider transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-marker focus-visible:ring-offset-2 focus-visible:ring-offset-terrain-paper",
  {
    variants: {
      variant: {
        default: "bg-marker text-terrain-paper hover:bg-marker-hover shadow-sm",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border-2 border-contour bg-transparent text-terrain-black hover:border-marker hover:text-marker",
        secondary:
          "bg-contour-light text-terrain-black hover:bg-contour",
        ghost:
          "text-terrain-black hover:bg-contour-light hover:text-terrain-black",
        link: "text-marker underline-offset-4 hover:underline",
        sage: "bg-sage text-terrain-paper hover:bg-sage-light",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 gap-1.5 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
