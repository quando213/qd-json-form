"use client";

import React from "react";
import { ButtonVariant } from "@/types/form";
import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const classesByVariant: Record<ButtonVariant, string> = {
  primary:
    "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500",
  secondary:
    "rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20",
  text: "px-3 text-sm/6 font-semibold text-gray-900 dark:text-white",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "secondary", className, children, type = "button", ...rest }, ref) => {
    const variantClasses = classesByVariant[variant] ?? classesByVariant.secondary;
    return (
      <button ref={ref} type={type} className={clsx(variantClasses, className)} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
