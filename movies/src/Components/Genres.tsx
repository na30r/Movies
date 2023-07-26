import { useQuery } from "react-query";
// import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { themoviedbApi } from "../utils/request";
import { GENRES_URL } from "../utils/constraints";
import useGenre from "../Hooks/useGenre";
import { Genre } from "../Models/Genre";

export default function Genres() {
  const { data, isLoading, error } = useGenre();
  return (
    <>
      {isLoading && <span> is loading ...</span>}
      {data?.map((a: Genre) => (
        <span key={a.id}> {a.name}</span>
      ))}
    </>
  );
}
