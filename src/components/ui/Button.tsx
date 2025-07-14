import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

function Button({children,variant = "primary",...props}: ButtonProps) {

    const baseClasses = "px-4 py-2 rounded-full font-medium transition";
    const variants: Record<ButtonVariant, string> = {
        primary: "bg-green-500 text-white hover:bg-green-600",
        outline: "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white",
        ghost: "text-green-500 hover:underline",
    };

    return (
        <button className={`${baseClasses} ${variants[variant]}`} {...props}>
            {children}
        </button>
    );
}

export default Button;
