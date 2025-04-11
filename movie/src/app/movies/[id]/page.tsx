/* eslint-disable @next/next/no-img-element */
"use client";

import { ACCESS_TOKEN, Movie } from "@/app/_components/Upcoming";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Params = {
  id: string;
};

type MovieDetails = {
  adult: boolean;
  title: string;
  id: number;
  overview: string;
  poster_path: string;
};

type Staff = {
  cast: { name: string }[];
};
type Trailer = {
  results: { key: string }[];
};

const MoviePage = () => {
  const { id } = useParams<Params>();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [staffinfo, setStaffinfo] = useState<Staff | null>(null);
  const [trailer, setTrailer] = useState<Trailer | null>(null);

  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setMovie(data);
    };
    getMovie();
  }, [id]);

  useEffect(() => {
    const getSimilar = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setSimilar(data.results);
      // console.log(data);
    };
    getSimilar();
  }, [id]);

  useEffect(() => {
    const getStaffinfo = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setStaffinfo(data);
      // console.log(data);
    };
    getStaffinfo();
  }, [id]);

  useEffect(() => {
    const getTrailer = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3//movie/${id}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setTrailer(data);
      console.log(data);
    };
    getTrailer();
  }, [id]);

  return (
    <div className="py-16">
      <img
        className="w-[300px] h-[400px]"
        alt=""
        src={"https://image.tmdb.org/t/p/original" + movie?.poster_path}
      />

      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">{movie?.title}</h1>

        <p className="text-secondary-foreground">{movie?.overview}</p>
      </div>

      <div>starts: {staffinfo?.cast[0]?.name}</div>
      <div>
        trailer: https://www.youtube.com/watch?v={trailer?.results[0]?.key}
      </div>

      <div className="flex ">
        {similar.map((movie) => {
          return (
            <Link
              href={`/movies/${movie.id}`}
              key={movie.id}
              className="w-[100px] h-[100px]"
            >
              <div>
                <img
                  alt="movie poster"
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                />
                <p>{movie.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MoviePage;
