import type { RootState } from "../store";

export const markers = (state: RootState) => state.markers.markers;
export const markersLoading = (state: RootState) => state.markers.isLoading;
export const markersError = (state: RootState) => state.markers.error;
