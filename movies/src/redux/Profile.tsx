import { createSelector, createSlice } from "@reduxjs/toolkit";
import UserMovies from "../Models/Profile";
import { useSelector } from "react-redux";

const initialState: UserMovies = {
  favorite: [],
  watchLater: [],
};

const slice = createSlice({
  initialState,
  name: "profile",
  reducers: {
    addMovieFavorite: (state, action) => {
      state.favorite.push(action.payload);
    },
    removeMovieFavorite: (state, action) => {
      state.favorite = state.favorite.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    addWatchLater: (state, action) => {
      state.watchLater.push(action.payload);
    },
    removeWatchLater: (state, action) => {
      state.watchLater = state.watchLater.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
  },
});

export const isLoggedIn = (a: any) => a.Profile.fullname != "";

export const {
  addMovieFavorite,
  removeMovieFavorite,
  addWatchLater,
  removeWatchLater,
} = slice.actions;
export default slice.reducer;
