import type { CardProps } from "../../types/components";

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`p-6 bg-white dark:bg-slate-800 rounded shadow ${className}`}>
      {children}
    </div>
  );
}
