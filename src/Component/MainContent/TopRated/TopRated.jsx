import React, { useEffect, useState } from "react";
import {
    Row, Col, Container, Card, Nav, Button,
    NavDropdown, OverlayTrigger, Tooltip, Form, Dropdown
} from "react-bootstrap";
import {
    FaArrowRight, FaBookmark, FaHeart, FaListUl, FaStar
} from "react-icons/fa6";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { SlOptions } from "react-icons/sl";
import TrailerButton from "../../Reusable/TrailerButton";
import "./TopRated.css";
import { BASE_URL, options } from './../../Reusable/tmdb';
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const TopRated = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [favorites, setFavorites] = useState({});
    const [minRating, setMinRating] = useState(0);
    const [searchType, setSearchType] = useState("name");
    const [searchValue, setSearchValue] = useState("");

    // 🔹 Load movies function
    const fetchMovies = async (pageNumber) => {
        try {
            const url = `${BASE_URL}/movie/top_rated?api_key=9705e2dad695de33ecb2d29eda6b0342&language=en-US&page=${pageNumber}&with_genres=28`;
            const res = await axios.get(url);
            setMovies((prev) => [...prev, ...res.data.results]); // ✅ append results
        } catch (err) {
            console.error(err);
        }
    };

    // 🔹 Fetch Favorites
    const fetchFavorites = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/account/21615133/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
                options
            );
            const favs = {};
            res.data.results.forEach((movie) => (favs[movie.id] = true));
            setFavorites(favs);
        } catch (err) {
            console.error("❌ Error fetching favorites:", err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchMovies(page);
        fetchFavorites();
    }, [page]);

    function addToFavorite(movId) {
        if (favorites[movId]) return;
        axios
            .post(
                "https://api.themoviedb.org/3/account/21615133/favorite",
                { media_type: "movie", media_id: movId, favorite: true },
                options
            )
            .then((res) => {
                if (res.data.success) {
                    setFavorites((prev) => ({ ...prev, [movId]: true }));
                }
            })
            .catch((err) => console.error("❌ Error:", err.response?.data || err.message));
    }

    // ✅ Filter by rating
    const filteredMovies = movies.filter((m) => m.vote_average >= minRating);

    // ✅ Search filter
    const searchedMovies = filteredMovies.filter((m) => {
        if (!searchValue) return true;
        if (searchType === "name") return m.title.toLowerCase().includes(searchValue.toLowerCase());
        if (searchType === "year") return m.release_date.startsWith(searchValue);
        if (searchType === "genre") return m.genre_ids.join(",").includes(searchValue);
        return true;
    });

    return (
        <Container className="py-2 align-items-center">
            {/* Header */}
            <div className="popular-header text-light p-4 rounded-4 mb-4">
                {/* Title + Filter */}
                <Row className="align-items-center mb-3">
                    <Col xs={12} md>
                        <div className="mb-0 text-warning fw-bold h2">Top Rated  </div>
                    </Col>
                    <Col xs={12} md="auto" className="d-flex gap-2 mt-3 mt-md-0">
                        {[6, 7, 8].map((num) => (
                            <Button
                                key={num}
                                variant={minRating === num ? "warning" : "outline-light"}
                                size="sm"
                                onClick={() => setMinRating(num)}
                            >
                                +{num} Star
                            </Button>
                        ))}
                        <Button
                            variant={minRating === 0 ? "warning" : "outline-light"}
                            size="sm"
                            onClick={() => setMinRating(0)}
                        >
                            All
                        </Button>
                    </Col>
                </Row>

                {/* Search */}
                <Row>
                    <Col xs={12} md className="d-flex gap-2 flex-wrap wrap">
                        <Dropdown className="ms-auto" onSelect={(key) => setSearchType(key)}>
                            <Dropdown.Toggle variant="warning" size="sm" className="fw-bold text-dark">
                                {searchType === "name"
                                    ? "Search by Name"
                                    : searchType === "year"
                                        ? "Search by Year"
                                        : "Search by Genre"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="name">Search by Name</Dropdown.Item>
                                <Dropdown.Item eventKey="year">Search by Year</Dropdown.Item>
                                <Dropdown.Item eventKey="genre">Search by Genre</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control
                            className="text-dark fw-bold"
                            type="search"
                            size="sm"
                            placeholder={`Enter ${searchType}...`}
                            value={searchValue}
                            style={{ width: "100%" }}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </Col>
                </Row>
            </div>

            {/* Movies Grid */}
            <Row className="g-4">
                {searchedMovies.length > 0 ? (
                    searchedMovies.map((movie) => (
                        <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="position-relative">
                            <Card className="movie-card shadow-lg border-0 rounded-4">
                                <div className="poster-wrapper">
                                    <Card.Img
                                        variant="top"
                                        src={imageBaseUrl + movie.poster_path}
                                        alt={movie.title}
                                        className="poster-img"
                                    />
                                </div>
                                <NavDropdown menuVariant="dark" title={<SlOptions size={30} />} className="options p-2">
                                    <NavDropdown.Item>Action</NavDropdown.Item>
                                    <NavDropdown.Item>Another action</NavDropdown.Item>
                                </NavDropdown>
                                <Card.Body className="bg-dark text-light text-center">
                                    <Card.Title className="fw-bold">{movie.title}</Card.Title>
                                    <Card.Text className="small">Release Date: {movie.release_date}</Card.Text>
                                    <div className="d-flex align-items-center mb-3 justify-content-center">
                                        <FaStar className="text-warning me-2" />
                                        <span>{movie.vote_average.toFixed(1)} / 10</span>
                                    </div>

                                    <div className="d-flex gap-3 m-3 text-center justify-content-center">
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Add to Favorite</Tooltip>}>
                                            <span
                                                className="icon-btn"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => addToFavorite(movie.id)}
                                            >
                                                <FaHeart size={24} color={favorites[movie.id] ? "red" : "white"} />
                                            </span>
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Add to List</Tooltip>}>
                                            <span className="icon-btn text-info"><FaListUl size={24} /></span>
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Add to Watchlist</Tooltip>}>
                                            <span className="icon-btn text-warning"><FaBookmark size={24} /></span>
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Play Trailer</Tooltip>}>
                                            <TrailerButton movieId={movie.id} />
                                        </OverlayTrigger>
                                    </div>

                                    <Card.Text className="movie-overview">{movie.overview}</Card.Text>
                                    <div className="btn btn-outline-warning">
                                        <Nav.Link as={NavLink} to={`/movie/${movie.id}`}>
                                            View Details
                                        </Nav.Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <h1 className="text-center">Movie Not Found</h1>
                )}
            </Row>

            {/* Load More Button */}
            <div className="text-center my-4">
                <Button variant="primary" onClick={() => setPage((prev) => prev + 1)}>
                    Load More <FaArrowRight />
                </Button>
            </div>
        </Container>
    );
};

export default TopRated;
