import type { SectionProps } from "../../types/components";

export default function Section({ id, className = "", children, style }: SectionProps) {
    return (
        <section
            id={id}
            className={`w-full overflow-x-hidden py-12 ${className}`}
            style={style}
        >
            {children}
        </section>
    );
}
