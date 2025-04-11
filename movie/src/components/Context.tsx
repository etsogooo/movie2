"use client";
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

/////////////////////////////////////////// CONTEXT ELEMENTS //////////////////////////////////////////

type ThemeContextType = {
  isDark: boolean;
  setIsDark: (a: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

export const Provider = ({ children }: PropsWithChildren) => {
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "1");

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "1" : "0");
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <div className={isDark ? "dark bg-amber-700" : "bg-amber-100"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// import { useContext } from "react";
// const { setIsDark, isDark } = useContext(ThemeContext); HEREGLEH GAZRAA INGEJ ORUULJ HEREGLENE

// <Provider>{children}</Provider> LAYOUT DEER INGEJ ORUULJ BUGDEND N AJILDAG BOLNO

/////////////////////////////////////////// CONTEXT ELEMENTS //////////////////////////////////////////

////////////////////////////////////////////// kinonii turul uud ///////////////////////////////////////////////////////

export const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWE4YzcxMjg5YThhM2QwZDYyNWI3NTdiYzAzODlmYSIsIm5iZiI6MTc0MzQwNzAyMS4zMTMsInN1YiI6IjY3ZWE0N2FkMmNjYTZmYzhmYmM2ZThkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gnpe5EWRKqQ3rqfkiaj4_0YxNj4CVoXCi_jixOIdWG0";

import axios from "axios";

type Genre = {
  id: number;
  name: string;
};

type GenreContextType = {
  genres: Genre[];
};

export const GenreContext = createContext<GenreContextType>({
  genres: [],
});

export const GenreProvider = ({ children }: PropsWithChildren) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
        // GET: /genre/movie/list?language=en kinonii turluudiin api
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      setGenres(data.genres);
    };

    getGenres();
  }, []);

  return (
    <GenreContext.Provider value={{ genres }}>{children}</GenreContext.Provider>
  );
};

export const useGenres = () => useContext(GenreContext);

////////////////////////////////////////////// kinonii turul uud ///////////////////////////////////////////////////////
