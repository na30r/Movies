import React from "react";
import "./App.css";
import Genres from "./Components/Genres";
import SideNav from "./general/SideNav";
import MovieList from "./Components/Movies/MovieList";
import AppLayout from "./general/Layout";

function App() {
  return (
    <>
      <AppLayout></AppLayout>
      {/* <SideNav></SideNav>
      <div className="App">
        <MovieList></MovieList>
      </div> */}
    </>
  );
}

export default App;
