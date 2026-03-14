import React from "react";
import Button from "@mui/material/Button";

type ButtonVariant = "text" | "outlined" | "contained";
type ButtonSize = "small" | "medium" | "large";

interface CommonButtonProps {
  text: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx? : any
}

const CommonButton: React.FC<CommonButtonProps> = ({
  text,
  onClick,
  variant = "contained",
  size = "medium",
  type = "button",
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  sx
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      type={type}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      {...sx}
    >
      {text}
    </Button>
  );
};

export default CommonButton;