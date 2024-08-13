import * as React from "react";

import { cn } from "@/lib/utils";
import { Divide } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: "default" | "primary" | "big";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, type, variant, ...props }, ref) => {
    const variantClasses = () => {
      switch (variant) {
        case "primary":
          return "bg-dark-3 outline-none border-violet-3 text-white py-7 text-md";
        case "big":
          return "bg-dark-3 outline-none border-violet-3 text-white text-lg py-7 placeholder:text-gray-400";
        default:
          return "bg-dark-3 outline-none border-violet-3 text-white py-6 text-md";
      }
    };
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          variantClasses(),
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
