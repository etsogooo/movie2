"use client";

import {
  PopularMovies,
  TopratedMovies,
  UpComingMovies,
} from "./_components/Upcoming";

//////////////////////////////////////// HOME PAGE /////////////////////////////////////////////////
export default function Home() {
  return (
    <div>
      <UpComingMovies />
      <PopularMovies />
      <TopratedMovies />
    </div>
  );
}
//////////////////////////////////////// HOME PAGE /////////////////////////////////////////////////
