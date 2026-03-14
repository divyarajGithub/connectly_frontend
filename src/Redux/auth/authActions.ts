import { loginApi, signupApi } from "@/api/authApi";
import {  createAsyncThunk } from "@reduxjs/toolkit";
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (data: any, thunkAPI) => {
    try {
      const res = await signupApi(data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Signup failed",
      );
    }
  },
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: any, thunkAPI) => {
    try {
      const res = await loginApi(data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Signup failed",
      );
    }
  },
);
