'use client'
import { usePathname } from "next/navigation";

import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";
import { Typography } from "@mui/material";
import React from "react";

function Layout({children}: {children : React.ReactNode}) {
  const pathname = usePathname();
  console.log("pathname", pathname);
  const publicRoutes = ["/", "/login", "/signup"];
  const privateLayout = ["/", "/settings" , "/profile" , "/messages"];

  if (privateLayout.includes(pathname)) {
    return <PrivateLayout>{children}</PrivateLayout>
  } else if (publicRoutes.includes(pathname)) {
    return <PublicLayout>{children}</PublicLayout>
  }
  return <Typography>Page not found</Typography>;
}

export default Layout;
