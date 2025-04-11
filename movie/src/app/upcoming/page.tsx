"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

const ACCESS_TOKEN =
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

type Response = {
  results: Movie[];
};

export default function UpComingMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,

        // `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,

        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setMovies(data.results);
    };
    getMoviesByAxios();
  }, [page]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Upcoming</h1>
      </div>

      <div className="grid grid-cols-5">
        {movies.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              />

              <p>{movie.title}</p>
            </div>
          </Link>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
              />
            </PaginationItem>
          )}
          {page > 1 && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                setPage(page);
              }}
              isActive
            >
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                setPage(page + 1);
              }}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setPage(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
