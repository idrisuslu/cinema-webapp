import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { GetRating } from "../../api";
import { Link } from "react-router-dom";
import styles from "./recentlyratedmoviecard.module.css";

function RecentlyRatedMovieCard({ list, index, movie, user }) {
  const { data: rating } = useQuery(["movieRating", parseInt(movie.id)], () =>
    GetRating({ user_id: user._id, movie_id: movie.id })
  );
  return (
    <div className="col-3 d-flex justify-content-center align-items-center flex-column p-1">
      <div className="">
        <Link
          className=""
          reloadDocument
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/detail/" + movie.id}
        >
          <img
            className="w-100 rounded"
            src={"https://www.themoviedb.org/t/p/w342" + movie.poster_path}
            alt=""
          />
        </Link>
      </div>
      <div className={"w-100 d-flex justify-content-center mt-2 p-1"}>
        <p className={styles.title}>
          {list.movies[list.movies.length - (index + 1)].movie.title}
        </p>
      </div>
      {rating && (
        <div>
          <p className="mt-1">{rating}</p>
        </div>
      )}
    </div>
  );
}

export default RecentlyRatedMovieCard;