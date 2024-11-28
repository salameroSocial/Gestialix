import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Asegúrate de tener una función para unir clases

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                default: "bg-black text-white hover:bg-gray-800",
                destructive: "bg-red-500 text-white hover:bg-red-600",
                outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
                secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
                ghost: "text-gray-700 hover:bg-gray-100",
                link: "text-blue-600 hover:underline",
            },
            size: {
                default: "h-10 py-2 px-4",
                sm: "h-9 px-3 rounded-md",
                lg: "h-11 px-8 rounded-md",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);


const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
    return (
        <button
            className={cn(buttonVariants({ variant, size }), className)} // Une variantes y clases
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = "Button";

export { Button, buttonVariants };
