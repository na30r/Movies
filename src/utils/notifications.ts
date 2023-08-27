import { Notification } from "../Models/Notification";

export const favoriteAdded = (movieTitle: string, description: string = ""): Notification => {
  return {
    type: "success",
    title: `${movieTitle} has been added to your favorites`,
    description,
  };
};

export const favoritedeleted = (movieTitle: string, description: string = ""): Notification => {
  return {
    type: "error",
    title: `${movieTitle} has been removed from your favorites`,
    description,
  };
};

export const watchLaterAdded = (movieTitle: string, description: string = ""): Notification => {
  return {
    type: "success",
    title: `${movieTitle} has been added to your watch list`,
    description,
  };
};

export const watchLaterdeleted = (movieTitle: string, description: string = ""): Notification => {
  return {
    type: "error",
    title: `${movieTitle} has been removed from your watch list`,
    description,
  };
};
