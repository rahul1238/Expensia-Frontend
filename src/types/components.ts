// Component props type definitions
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import type { LinkProps } from 'react-router-dom';
import type { TransactionData } from './finance';
import type { TransactionFilters } from '../services/transactionService';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type LinkButtonVariant = 'primary' | 'outline' | 'ghost';

export interface ProtectedRouteProps {
  children: ReactNode;
}

export interface AddTransactionFormProps {
  onSuccess: (transaction: TransactionData) => void;
  onCancel: () => void;
  initialData?: TransactionData;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export interface TransactionProps {
  transaction: TransactionData;
}

export interface TransactionListProps {
  transactions: TransactionData[];
  onEdit: (transaction: TransactionData) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export interface TransactionFiltersProps {
  onFiltersChange: (filters: TransactionFilters) => void;
  currentFilters: TransactionFilters;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
}

export interface LinkButtonProps extends LinkProps {
  variant?: LinkButtonVariant;
  children: ReactNode;
}

export interface NavbarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
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
