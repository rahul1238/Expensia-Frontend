import React from "react";

interface SectionProps {
    id?: string;
    className?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

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
