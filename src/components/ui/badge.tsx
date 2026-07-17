import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "outline";
}

const variantClasses = {
  default: "bg-blue-100 text-blue-800 border-blue-200",
  secondary: "bg-gray-100 text-gray-700 border-gray-200",
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-amber-100 text-amber-800 border-amber-200",
  danger: "bg-red-100 text-red-800 border-red-200",
  outline: "bg-transparent border-gray-300 text-gray-700",
};

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
