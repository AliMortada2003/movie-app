import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import axios from "axios";
import HeroSection from "./HeroSection";
import Section from "./Section";
import TrailersSection from "./TrailersSection";
import { BASE_URL, options } from "../../Reusable/tmdb";
import { fetchFavorites } from "../../Reusable/favorites";
import "./home.css"
function Home() {
    const [trending, setTrending] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const [popular, setPopular] = useState([]);
    const [free, setFree] = useState([]);
    const [favorites, setFavorites] = useState({});
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [heroIndex, setHeroIndex] = useState(0);

    // ✅ API Fetch functions
    async function fetchTrending() {
        const res = await axios.get(`${BASE_URL}/trending/movie/day?language=en`, options);
        return res.data.results;
    }

    async function fetchPopular() {
        const res = await axios.get(`${BASE_URL}/movie/popular?language=en-US&page=1`, options);
        return res.data.results;
    }

    async function fetchFree() {
        const res = await axios.get(`${BASE_URL}/movie/top_rated?language=en-US&page=1`, options);
        return res.data.results;
    }

    async function fetchTrailers(movies) {
        const trailerPromises = movies.map(async (movie) => {
            const videoRes = await axios.get(`${BASE_URL}/movie/${movie.id}/videos?language=en-US`, options);
            const trailer = videoRes.data.results.find((v) => v.type === "Trailer" && v.site === "YouTube");
            return { ...movie, trailerKey: trailer ? trailer.key : null };
        });
        return Promise.all(trailerPromises);
    }

    // ✅ Main fetch
    useEffect(() => {
        async function fetchData() {
            try {
                const [trendingRes, popularRes, freeRes, favRes] = await Promise.all([
                    fetchTrending(),
                    fetchPopular(),
                    fetchFree(),
                    fetchFavorites(),
                ]);

                setTrending(trendingRes);
                setPopular(popularRes);
                setFree(freeRes);
                setFavorites(favRes.favs);
                setFavoriteMovies(favRes.movies);

                const trailersRes = await fetchTrailers(popularRes);
                setTrailers(trailersRes);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    // ✅ Rotate Hero Favorites
    useEffect(() => {
        if (favoriteMovies.length === 0) return;
        const interval = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % favoriteMovies.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [favoriteMovies]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" variant="light" />
            </div>
        );
    }

    return (
        <>
            <HeroSection heroMovie={favoriteMovies[heroIndex]} />
            <div className=" text-white">
                <Container className="py-5">
                    <Section title="🔥 Trending" data={trending} favorites={favorites} setFavorites={setFavorites} />
                    <TrailersSection title="🎥 Latest Trailers" data={trailers} />
                    <Section title="⭐ What's Popular" data={popular} favorites={favorites} setFavorites={setFavorites} />
                    <Section title="📺 Free To Watch" data={free} favorites={favorites} setFavorites={setFavorites} />
                </Container>
            </div>
        </>
    );
}

export default Home;
