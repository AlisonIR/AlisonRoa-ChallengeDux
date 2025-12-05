import React from "react";
import type { ButtonProps } from "../../utils/types";

export default function Button({
  label,
  onClick,
  icon,
  type = "button",
  style,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-btn ${className}`}
      style={style}
    >
      {icon && <i className={icon} style={{ marginRight: 8 }} />}
      {label}
    </button>
  );
}
