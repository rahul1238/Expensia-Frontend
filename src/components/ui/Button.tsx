import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    loading?: boolean;
}

function Button({children, variant = "primary", loading = false, ...props}: ButtonProps) {

    const baseClasses = "px-4 py-2 rounded-full font-medium transition relative";
    const variants: Record<ButtonVariant, string> = {
        primary: "bg-green-500 text-white hover:bg-green-600",
        outline: "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white",
        ghost: "text-green-500 hover:underline",
    };
    
    const disabledClasses = loading || props.disabled ? "opacity-70 cursor-not-allowed" : "";

    return (
        <button 
            className={`${baseClasses} ${variants[variant]} ${disabledClasses}`} 
            disabled={loading || props.disabled}
            {...props}
        >
            {loading && (
                <span className="absolute left-0 right-0 flex justify-center items-center">
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </span>
            )}
            <span className={loading ? "invisible" : ""}>
                {children}
            </span>
        </button>
    );
}

export default Button;
