import React from "react";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
}) => {
  return (
    <button
      className={` text-white px-6 py-2 hover:bg-[#eeeeee] hover:text-[#292d8c] transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
