"use client";

import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import CommonTextField from "@/Components/Common/CommonTextField";
import CommonButton from "@/Components/Common/CommonButton";
import { useAppDispatch } from "@/Redux/store";
import useSnackbar from "@/hooks/app/useSnackbar";
import usePageLoader from "@/hooks/app/usePageLoader";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginUser } from "@/Redux/auth/authActions";
import { useRouter } from "next/navigation";

type LoginFormTypes = {
  email: string;
  password: string;
};

function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showToast } = useSnackbar();
  const { setPageLoader } = usePageLoader();

  const [formData, setFormData] = useState<LoginFormTypes>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormTypes>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validation = () => {
    let flag = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let tempErrors: LoginFormTypes = {
      email: "",
      password: "",
    };

    if (!formData.email.trim()) {
      tempErrors.email = "Please enter email.";
      flag = true;
    }

    if (formData.email && !emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter valid email.";
      flag = true;
    }

    if (!formData.password.trim()) {
      tempErrors.password = "Please enter password.";
      flag = true;
    }

    setErrors(tempErrors);
    return flag;
  };

  const handleLogin = async () => {
    if (validation()) return;

    try {
      setPageLoader(true);

      const res = await dispatch(loginUser(formData)).unwrap();

      if (res.success) {
        showToast("success", res.message);
        router.push("/");
      }
    } catch (err: any) {
      showToast("error", err.message || "Something went wrong");
    } finally {
      setPageLoader(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "450px",
          boxShadow: "0px 8px 30px rgba(0,0,0,0.08)",
          borderRadius: 2,
          backgroundColor: "#fff",
          p: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Image src="/Images/logo.svg" width={180} height={120} alt="logo" />
        </Box>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "18px",
            mb: 2,
            textAlign: "center",
          }}
        >
          Login
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CommonTextField
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              type="text"
              value={formData.email}
              error={!!errors.email}
              helperText={errors.email}
              label="Email"
              required
              startIcon={<EmailOutlinedIcon sx={{ color: "text.secondary" }} />}
            />
          </Grid>

          <Grid item xs={12}>
            <CommonTextField
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              type="password"
              value={formData.password}
              error={!!errors.password}
              helperText={errors.password}
              label="Password"
              required
              startIcon={<LockOutlinedIcon sx={{ color: "text.secondary" }} />}
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <CommonButton onClick={handleLogin} text="Login" />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
                fontSize: "14px",
              }}
            >
              Don’t have an account?{" "}
              <span
                style={{
                  color: "#1976d2",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                onClick={() => router.push("/signup")}
              >
                Register
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Page;