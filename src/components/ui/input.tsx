import * as React from "react";

import { cn } from "@/lib/utils";
import { Divide } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: "default" | "primary" | "secondary";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, type, variant, ...props }, ref) => {
    const variantClasses = () => {
      switch (variant) {
        case "primary":
          return "bg-dark-3 outline-none border-violet-3 text-white";
        case "secondary":
          return "border-secondary text-secondary";
        case "default":
        default:
          return "border-input text-input";
      }
    };
    return (
      <div>
        {label && (
          <div className=" text-white text-xl font-semibold mb-1.5">
            {label}
          </div>
        )}
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
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
