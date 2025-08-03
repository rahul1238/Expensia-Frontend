import { Link } from "react-router-dom";
import type { LinkButtonProps, LinkButtonVariant } from "../../types/components";

function LinkButton({to,children,variant = "primary",...props}: LinkButtonProps) {
  const baseClasses = "px-4 py-2 rounded-full font-medium transition";
  const variants: Record<LinkButtonVariant, string> = {
    primary: "bg-green-500 text-white hover:bg-green-600",
    outline: "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white",
    ghost: "text-green-500 hover:underline",
  };

  return (
    <Link to={to} className={`${baseClasses} ${variants[variant]}`} {...props}>
      {children}
    </Link>
  );
}

export default LinkButton;
