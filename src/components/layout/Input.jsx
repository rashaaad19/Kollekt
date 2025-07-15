import React from "react";

const Input = ({ placeholder, className = "", ...props }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`input input-bordered input-sm flex-1 focus:outline-none focus:ring-0 focus:border-primary ${className}`}
      {...props}
    />
  );
};

export default Input;
