import { createSlice } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";


export type snackBarType = "success" | "info" | "warning" | "error";

interface initialStateTypes {
    fullPageLoader: boolean,
    snackBar: {
        open: boolean,
        message: string,
        severity: AlertColor;
    }
}
const initialState: initialStateTypes = {
    fullPageLoader: false,
    snackBar: {
        open: false,
        message: "",
        severity: "success",
    }
}
const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setFullPageLoader: (state, action) => {
            state.fullPageLoader = action.payload
        },
        showSnackbar: (state, action) => {
            state.snackBar.open = true;
            state.snackBar.message = action.payload.message;
            state.snackBar.severity = action.payload.severity;
        },
        hideSnackbar: (state) => {
            state.snackBar.open = false;
            state.snackBar.message = "";
            state.snackBar.severity = "success";
        },
    },
})

export const { setFullPageLoader, hideSnackbar, showSnackbar } = appSlice.actions

export default appSlice.reducer