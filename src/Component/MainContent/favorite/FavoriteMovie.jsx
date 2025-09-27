import React from 'react'
import { useEffect, useState } from "react";
import { Row, Col, Container, Card, Nav, Button, Dropdown, NavDropdown, OverlayTrigger, Tooltip, } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight, FaBookmark, FaHeart, FaListUl, FaPlay, FaStar, } from "react-icons/fa6";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { SlOptions } from "react-icons/sl";
import { SiFireship } from "react-icons/si";
import TrailerButton from '../../Reusable/TrailerButton';

function FavoriteMovie() {
    const [favorites, setFavorites] = useState([]);
    const [page, setPage] = useState(1)
    const url = `https://api.themoviedb.org/3/account/21615133/favorite/movies?language=en-US&page=${page}&sort_by=created_at.asc`;
    const options = {
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzA1ZTJkYWQ2OTVkZTMzZWNiMmQyOWVkYTZiMDM0MiIsIm5iZiI6MTczMDkzMDgzNi40NjIwMDAxLCJzdWIiOiI2NzJiZTg5NDY5YjgxZTQ4MzczMWY1NzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AT_BTdw_OW2lcZ1RpvzdFUUCAubuwnnv2ZAE95PQd_k",
        },
    };


    // Get Favorite Movies
    useEffect(() => {
        axios
            .get(url, options)
            .then((res) => {
                setFavorites(res.data.results);
                console.log(res.data.results)
            })
            .catch((err) => {
                console.error(err);
            });
    }, [page]);

    // Function to remove From Favorite List
    function RemoveFromFavorite(movId) {
        axios.post(
            "https://api.themoviedb.org/3/account/21615133/favorite",
            {
                media_type: "movie",
                media_id: movId,
                favorite: false,
            },
            options
        )
            .then((res) => {
                if (res.data.success) {
                    console.log("❌ Removed from favorites:", movId);
                    setFavorites((prev) => prev.filter((movie) => movie.id !== movId));
                }
            })
            .catch((err) => {
                console.error("❌ Error:", err.response?.data || err.message);
            });
    }

    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    return (
        <Container className="py-5">
            <h1 className="text-center py-5 text-warning">
                My Favorite Movies<FaHeart color='red' className="ms-1" size={40} />
            </h1>
            <Row className="g-4">
                {favorites.map((movie) => (
                    <Col
                        key={movie.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className="position-relative"
                    >
                        <Card className="movie-card shadow-lg border-0 rounded-4">
                            <div className="poster-wrapper">
                                <Card.Img
                                    variant="top"
                                    src={imageBaseUrl + movie.poster_path}
                                    alt={movie.title}
                                    className="poster-img"
                                />
                            </div>
                            {/* Dropdown options */}
                            <NavDropdown
                                menuVariant="dark"
                                title={<SlOptions size={30} />}
                                className="options p-2"
                            >
                                <NavDropdown.Item href="#action/1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3">Something</NavDropdown.Item>
                            </NavDropdown>

                            <Card.Body className="bg-dark text-light text-center">
                                <Card.Title className="fw-bold">{movie.title}</Card.Title>
                                <Card.Text className="small">
                                    Release Date: {movie.release_date}
                                </Card.Text>
                                <div className="d-flex align-items-center mb-3 justify-content-center">
                                    <FaStar className="text-warning me-2" />
                                    <span>{movie.vote_average.toFixed(1)} / 10</span>
                                </div>
                                {/* Actions buttons */}
                                <div className="d-flex gap-3 m-3 text-center justify-content-center">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>Remove from Favorite</Tooltip>}
                                    >
                                        <span
                                            className="icon-btn"
                                            style={{ cursor: "pointer" }}
                                        >
                                            <FaHeart size={24} onClick={() => { RemoveFromFavorite(movie.id) }} color="red" />
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>Add to List</Tooltip>}
                                    >
                                        <span className="icon-btn text-info">
                                            <FaListUl size={24} />
                                        </span>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>Add to Watchlist</Tooltip>}
                                    >
                                        <span className="icon-btn text-warning">
                                            <FaBookmark size={24} />
                                        </span>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Play Trailer</Tooltip>}>
                                        <TrailerButton movieId={movie.id} />
                                    </OverlayTrigger>
                                </div>
                                <Card.Text className="movie-overview">
                                    {movie.overview}
                                </Card.Text>
                                <div className="btn btn-outline-warning">
                                    <Nav.Link as={NavLink} to={`/movie/${movie.id}`}>
                                        View Details
                                    </Nav.Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}

                {/* Pagination buttons */}
                <Container className="d-flex justify-content-between my-5">
                    <Button
                        variant="light"
                        className="d-flex align-items-center gap-2 px-4 py-2 rounded-pill shadow-sm custom-btn"
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        <FaArrowLeft /> Previous
                    </Button>
                    <Button
                        variant="primary"
                        className="d-flex align-items-center gap-2 px-4 py-2 rounded-pill shadow custom-btn"
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={favorites.length < 20}
                    >
                        Next <FaArrowRight />
                    </Button>
                </Container>
            </Row>
        </Container>
    );
}

export default FavoriteMovie