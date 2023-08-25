import { combineReducers } from "@reduxjs/toolkit";
import Profile from "./Profile";
import auth from "./auth";

const reducer = combineReducers({
  Profile,
  auth,
});
export default reducer;
