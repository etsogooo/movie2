"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWE4YzcxMjg5YThhM2QwZDYyNWI3NTdiYzAzODlmYSIsIm5iZiI6MTc0MzQwNzAyMS4zMTMsInN1YiI6IjY3ZWE0N2FkMmNjYTZmYzhmYmM2ZThkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gnpe5EWRKqQ3rqfkiaj4_0YxNj4CVoXCi_jixOIdWG0";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  popularity: number;
  poster_path: string;
  title: string;
  overview: string;
};

export type Response = {
  results: Movie[];
};

export const UpComingMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setMovies(data.results);
    };
    getMoviesByAxios();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Upcoming</h1>
        <Link href={"/upcoming"}>
          <Button>
            <span className="text-xs">See all</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-5">
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />

            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setMovies(data.results);
    };
    getMoviesByAxios();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Popular</h1>
        <Link href={"/popular"}>
          <Button>
            <span className="text-xs">See all</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-5">
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />

            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TopratedMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setMovies(data.results);
    };
    getMoviesByAxios();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Top Rated</h1>
        <Link href={"/top_rated"}>
          <Button>
            <span className="text-xs">See all</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-5">
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />

            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
