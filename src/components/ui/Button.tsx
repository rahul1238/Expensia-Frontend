import type { ButtonProps, ButtonVariant, ButtonSize } from "../../types/components";

function Button({children, variant = "primary", size = "md", ...props}: ButtonProps) {

    const baseClasses = "rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants: Record<ButtonVariant, string> = {
        primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
        outline: "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500",
        ghost: "text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500",
    };

    const sizes: Record<ButtonSize, string> = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button className={`${baseClasses} ${variants[variant]} ${sizes[size]}`} {...props}>
            {children}
        </button>
    );
}

export default Button;
