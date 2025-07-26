// Component props type definitions
import type { ReactNode } from 'react';

export interface ProtectedRouteProps {
  children: ReactNode;
}

export interface BaseButtonProps {
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
}

export interface LinkButtonProps {
  to: string;
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
}

export interface NavbarLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

export interface StatBoxProps {
  value: string;
  label: string;
}
