import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, children, disabled, type = "input", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        {...props}
        className={twMerge(
          `
     w-full
     md:w-1/2
     p-3
     rounded-md
     bg-purple-200 dark:bg-slate-900
     border
     border-transparent
     text-sm
     file:border-0
     file:bg-transparent
     file:text-sm
     file:font-medium
     placeholder:text-neutral-400
     disabled:cursor-not-allowed
     disabled:opacity-50
     focus:outline-none

      `,
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
