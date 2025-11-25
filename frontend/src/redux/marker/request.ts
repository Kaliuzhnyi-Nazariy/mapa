import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api.config";
import type { Marker } from "../../types/markers";

export const getMarkers = createAsyncThunk<
  {
    id: string;
    name: string;
    position: { lng: number; lat: number };
    owner_id?: string;
  }[],
  void,
  { rejectValue: { message: string } }
>("/getMarkers", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/marker");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log(error);
      return rejectWithValue({
        message: error.response?.data?.message || "Signin failed",
      });
    }
    return rejectWithValue({ message: "Unexpected error occurred" });
  }
});

export const addMarker = createAsyncThunk<
  // {
  //   id: string;
  //   name: string;
  //   position: { lng: number; lat: number };
  //   owner_id?: string;
  // },
  Marker,
  { markerName: string; position: { lng: number; lat: number } },
  { rejectValue: { message: string } }
>("/addMarker", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/marker/add", data);
    // console.log(res.data);
    return res.data[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log(error);
      return rejectWithValue({
        message: error.response?.data?.message || "Signin failed",
      });
    }
    return rejectWithValue({ message: "Unexpected error occurred" });
  }
});

export const updateMarker = createAsyncThunk<
  {
    id: string;
    name: string;
    position: { lng: number; lat: number };
    owner_id?: string;
  },
  {
    markerId: string;
    markerName: string;
    position: { lng: number; lat: number };
  },
  { rejectValue: { message: string } }
>("/updateMarker", async (data, { rejectWithValue }) => {
  try {
    const res = await api.put(`/marker/${data.markerId}`, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Signin failed",
      });
    }
    return rejectWithValue({ message: "Unexpected error occurred" });
  }
});

export const deleteMarker = createAsyncThunk<
  {
    id: string;
    name: string;
    position: { lng: number; lat: number };
    owner_id?: string;
  },
  {
    markerId: string;
  },
  { rejectValue: { message: string } }
>("/deleteMarker", async (data, { rejectWithValue }) => {
  try {
    const res = await api.delete(`/marker/${data.markerId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Signin failed",
      });
    }
    return rejectWithValue({ message: "Unexpected error occurred" });
  }
});
