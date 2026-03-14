"use client";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CommonTextField from "@/Components/Common/CommonTextField";
import CommonButton from "@/Components/Common/CommonButton";
import { useAppDispatch } from "@/Redux/store";
import useSnackbar from "@/hooks/app/useSnackbar";
import usePageLoader from "@/hooks/app/usePageLoader";
import { useSelector } from "react-redux";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { signupUser } from "@/Redux/auth/authActions";
import { useRouter } from "next/navigation";

type signupFormTypes = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

function page() {
    const state = useSelector((state) => state)
    const router =useRouter()
    const dispatch = useAppDispatch()
    const { showToast } = useSnackbar()
    const { setPageLoader } = usePageLoader()
    const [formData, setFormData] = useState<signupFormTypes>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors((prev) => ({
            ...prev,
            [e.target.name]: ""
        }))
    };


    const validation = () => {
        let flag: boolean = false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        let tempErros: signupFormTypes = {
            username: "",
            email: "",
            password: '',
            confirmPassword: '',
        }
        if (!formData.username.trim()) {
            tempErros.username = "Please enter the username."
            flag = true;
        }
        if (!formData.email.trim()) {
            tempErros.email = "Please enter the email."
            flag = true;
        }
        if (formData.email && !emailRegex.test(formData.email)) {
            tempErros.email = "Please enter the valid email."
            flag = true;
        }
        if (!formData.password.trim()) {
            tempErros.password = "Please enter the password."
            flag = true;
        }
        if (!formData.confirmPassword.trim()) {
            tempErros.confirmPassword = "Please enter the confirmPassword."
            flag = true;
        }
        if (formData.confirmPassword && formData.password && formData.password != formData.confirmPassword) {
            tempErros.confirmPassword = "Confim password not match"
            flag = true;
        }
        setErrors(tempErros)
        return flag;
    }

    const handleSignup = async() => {
        if (validation()) {
            return;
        }
        try{
            const payload = {
                username : formData.username,
                email : formData.email,
                password : formData.password
            }
            setPageLoader(true)
            const res = await dispatch(signupUser(payload)).unwrap()
            console.log("res" , res)
            if(res.success){
                showToast("success" , res.message)
                router.push('/login')
                
            }
        }catch(err : any){
            showToast("error" , err.message || "something went wrong")
        }finally{
            setPageLoader(false)
        }
    }
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
                    width: "500px",

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
                        mb: 1,
                        textAlign: "center",
                    }}
                >
                    Create Account
                </Typography>

                <Box component={"form"}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CommonTextField
                                name="username"
                                placeholder="Enter your username"
                                onChange={handleChange}
                                type="text"
                                value={formData.username}
                                error={!!errors.username}
                                helperText={errors.username}
                                label="Username"
                                required={true}
                                startIcon={<PersonOutlineIcon sx={{ color: "text.secondary" }} />}
                            />
                        </Grid>
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
                                required={true}
                                startIcon={<EmailOutlinedIcon sx={{ color: "text.secondary" }} />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CommonTextField
                                name="password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                type="text"
                                value={formData.password}
                                error={!!errors.password}
                                helperText={errors.password}
                                label="Password"
                                required={true}
                                startIcon={<LockOutlinedIcon sx={{ color: "text.secondary" }} />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CommonTextField
                                name="confirmPassword"
                                placeholder="Confirm password"
                                onChange={handleChange}
                                type="text"
                                value={formData.confirmPassword}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                label="Confirm Password"
                                required={true}
                                startIcon={<LockOutlinedIcon sx={{ color: "text.secondary" }} />}
                            />
                        </Grid>
                        <Grid item xs={12} justifyContent={"center"} display={'flex'} >
                            <CommonButton onClick={() => { handleSignup() }} text="Sign Up" />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default page;
