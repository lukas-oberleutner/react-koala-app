// Import
import React, { HTMLAttributes } from 'react';

// Interface
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// Component
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
  ariaLabel,
  ariaExpanded,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${className || ''}`}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
