// Import
import { iconChevronUp, iconChevronDown, iconDelete } from '@/assets/icons.ts';
import React from 'react';

// Interface
interface IconProps {
  className: string;
  svg: string;
}

// Component
const Icon: React.FC<IconProps> = ({ className, svg }) => {
  const icons: { [key: string]: string } = {
    iconChevronUp,
    iconChevronDown,
    iconDelete,
  };

  const iconSvg = icons[svg];

  if (!iconSvg) {
    return <span>Ikona nenalezena</span>;
  }

  return (
    <span
      className={`block size-6 ${className}`}
      dangerouslySetInnerHTML={{ __html: iconSvg }}
    />
  );
};

export default Icon;
