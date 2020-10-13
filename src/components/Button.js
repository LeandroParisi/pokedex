import React from "react";
import "./style_sheets/button.css";

const Button = ({ className, children, disabled, onClick, id }) => (
  <button
    onClick={onClick}
    className={`button-text ${className}`}
    disabled={disabled}
    id={id}
  >
    {children}
  </button>
);

export default Button;