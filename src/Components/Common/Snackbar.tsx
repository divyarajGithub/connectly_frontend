import { useAppDispatch, useAppSelector } from "@/Redux/store";
import { Alert, Snackbar as MuiSnackbar } from "@mui/material";
import React from "react";
import { hideSnackbar } from "@/Redux/app/appSlice";

const Snackbar = () => {
  const snackbarState = useAppSelector((state) => state.app.snackBar);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <MuiSnackbar
      open={snackbarState.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarState?.severity || "success"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbarState?.message || "No Message Found"}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;