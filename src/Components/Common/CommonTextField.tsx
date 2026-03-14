import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, InputLabel, Typography } from "@mui/material";
import theme from "@/theme";

interface CommonTextFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  size? : "small" | "medium",
  required : boolean
}

const CommonTextField: React.FC<CommonTextFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  error = false,
  helperText = "",
  startIcon,
  endIcon,
  fullWidth = true,
  size = "small",
  required = false,
  ...sx
}) => {
  return (
    <Box>
      <InputLabel sx={{fontSize : '14px'}}>
      {label}
      {required && <span style={{color : theme.palette.error.main}}>*</span>}
      </InputLabel>
      <Box sx={{marginTop : "4px"}}>

      <TextField
        
        name={name}
        type={type}
        size={size}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        variant="outlined"
        color="primary"
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          endAdornment: endIcon && (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ),
        }}
        {...sx}
      />
      </Box>
    </Box>
  );
};

export default CommonTextField;