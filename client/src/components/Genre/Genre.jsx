import React from "react";
import { useQuery } from "react-query";
import { getGenreList } from "../../api";
import GenreCard from "../GenreCard/GenreCard";
import style from "./genre.module.css";

function Genre(props) {

    const { data } = useQuery("genre", getGenreList);
    const genres = data?.genres;

    const resultGenres = [];

    for(let i = 0; i < genres?.length; i++) {

        for(let j = 0; j < props.genres.length; j++) {
            if(genres[i].id === props.genres[j]) {
                resultGenres.push(genres[i].name)
            }
        }
            
    }

    function renderGenres(genre) {
        return <GenreCard item={genre} />
    }

    return (
        <div className={style.container}>
            {resultGenres.map(renderGenres)}
        </div>
    );
}

export default Genre;