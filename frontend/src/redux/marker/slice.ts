import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addMarker, deleteMarker, getMarkers, updateMarker } from "./request";
import { handleLoading, handleRejected } from "../sliceHelpers";

export interface MarkerState {
  markers: {
    id: string;
    name: string;
    position: { lng: number; lat: number };
  }[];
  isLoading: boolean;
  error: null | string;
  //   owner_id: string;
}

const initialState: MarkerState = {
  markers: [],
  isLoading: false,
  error: null,
};

const MarkerSlice = createSlice({
  name: "Markers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMarkers.pending, handleLoading)
      .addCase(
        getMarkers.fulfilled,
        (
          state: MarkerState,
          action: PayloadAction<
            {
              id: string;
              name: string;
              position: { lng: number; lat: number };
              owner_id?: string;
            }[]
          >
        ) => {
          state.isLoading = false;
          state.markers = action.payload;
        }
      )
      .addCase(getMarkers.rejected, handleRejected)

      .addCase(addMarker.pending, handleLoading)
      .addCase(
        addMarker.fulfilled,
        (
          state: MarkerState,
          action: PayloadAction<{
            id: string;
            name: string;
            position: { lng: number; lat: number };
            owner_id?: string;
          }>
        ) => {
          state.isLoading = false;
          state.markers.push(action.payload);
        }
      )
      .addCase(addMarker.rejected, handleRejected)

      .addCase(updateMarker.pending, handleLoading)
      .addCase(
        updateMarker.fulfilled,
        (
          state: MarkerState,
          action: PayloadAction<{
            id: string;
            name: string;
            position: { lng: number; lat: number };
            owner_id?: string;
          }>
        ) => {
          state.isLoading = false;

          const markerId = state.markers.findIndex(
            (m) => m.id == action.payload.id
          );

          if (markerId !== -1) {
            state.markers.splice(markerId, 1, action.payload);
          }
        }
      )
      .addCase(updateMarker.rejected, handleRejected)

      .addCase(deleteMarker.pending, handleLoading)
      .addCase(
        deleteMarker.fulfilled,
        (
          state: MarkerState,
          action: PayloadAction<{
            id: string;
            name: string;
            position: { lng: number; lat: number };
            owner_id?: string;
          }>
        ) => {
          state.isLoading = false;
          const markerId = state.markers.findIndex(
            (m) => m.id == action.payload.id
          );

          if (markerId !== -1) {
            state.markers.splice(markerId, 1);
          }
        }
      )
      .addCase(deleteMarker.rejected, handleRejected);
  },
});

export const markerReducer = MarkerSlice.reducer;
