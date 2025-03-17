// Import
import React from 'react';

// Interface
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any;
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
