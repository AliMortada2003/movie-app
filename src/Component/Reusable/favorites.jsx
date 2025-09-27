// src/utils/favorite.js
import axios from "axios";
import { options } from "./tmdb";

// add to favorite
export async function addToFavorite(movieId, setFavorites) {
    try {
        const res = await axios.post(
            "https://api.themoviedb.org/3/account/21615133/favorite",
            { media_type: "movie", media_id: movieId, favorite: true },
            options
        );

        if (res.data.success) {
            setFavorites((prev) => ({ ...prev, [movieId]: true }));
        }
    } catch (err) {
        console.error("❌ Error adding favorite:", err.response?.data || err.message);
    }
}

// fetch favorites
export async function fetchFavorites() {
    try {
        const res = await axios.get(
            "https://api.themoviedb.org/3/account/21615133/favorite/movies?language=en-US&page=1",
            options
        );
        const favs = {};
        res.data.results.forEach((movie) => (favs[movie.id] = true));
        return { favs, movies: res.data.results };
    } catch (err) {
        console.error("❌ Error fetching favorites:", err.response?.data || err.message);
        return { favs: {}, movies: [] };
    }
}
