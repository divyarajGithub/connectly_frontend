"use client";

import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import store from "@/Redux/store";
import theme from "@/theme";
import Snackbar from "@/Components/Common/Snackbar";
import GlobalFullPageLoader from "@/Components/Common/FullPageLoader";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}

        {/* Global Components */}
        <GlobalFullPageLoader />
        <Snackbar />
      </ThemeProvider>
    </Provider>
  );
}