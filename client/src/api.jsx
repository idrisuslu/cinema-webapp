import axios from "axios";

export async function fetchMovies(query) {
    const url = "https://api.themoviedb.org/3/search/movie?api_key=" + process.env.REACT_APP_API_URL + "&query=" + query;

    const { data } = await axios.get(url);

    return data;
};

export async function fetchNowPlayingOrUpcomingMovies(query) {
    const url = "https://api.themoviedb.org/3/movie/"+ query + "api_key=" + process.env.REACT_APP_API_URL + "&language=en-US";

    const { data } = await axios.get(url);

    return data;
};

export async function getImages(id) {
    const url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + process.env.REACT_APP_API_URL + "&append_to_response=images";

    const { data } = await axios.get(url);
    
    return data;
}

export async function getGenreList() {
    const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + process.env.REACT_APP_API_URL;
    
    const { data } = await axios.get(url);

    return data;
}

export async function getDetail(id) {
    const url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + process.env.REACT_APP_API_URL;
    
    const { data } = await axios.get(url);

    return data;
}

export async function fetchRegister(values) {
    const url = "http://localhost:4000/auth/register";

    const { data } = await axios.post(url, values);

    return data;
}

export async function fetchLogin(values) {
    const url = "http://localhost:4000/auth/login";

    const { data } = await axios.post(url, values);

    return data;
}