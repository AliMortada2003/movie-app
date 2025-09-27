import React from "react";
import { Card, Nav, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { FaBookmark, FaHeart, FaListUl, FaStar } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import TrailerButton from "../../Reusable/TrailerButton";
import { addToFavorite } from "../../Reusable/favorites";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function Section({ title, data, favorites, setFavorites }) {
    return (
        <div className="mb-5">
            <h2 className="fw-bold display-6 my-5 ">{title}</h2>

            {/* 🔹 Horizontal scroll */}
            <div
                className="d-flex overflow-auto gap-3 py-3"
                style={{ scrollSnapType: "x mandatory" }}
            >
                {data.map((movie) => (
                    <Card
                        key={movie.id}
                        className="shadow-lg border-0 flex-shrink-0"
                        style={{
                            width: "280px",
                            scrollSnapAlign: "start",
                            borderRadius: "16px",
                            overflow: "hidden",
                            background: "linear-gradient(180deg, #1a1a1a, #000)", // تدرج جميل
                        }}
                    >
                        <Card.Img
                            variant="top"
                            src={movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : "/fallback.jpg"}
                            alt={movie.title}
                            style={{
                                height: "250px",
                                width: "100%",
                                objectFit: "cover",
                                borderBottom: "1px solid #FFD700", // خط ذهبي يفصل الصورة
                            }}
                        />

                        <Card.Body className="text-light text-center d-flex flex-column justify-content-between">
                            {/* Title */}
                            <Card.Title className="fw-bold text-truncate text-white">
                                {movie.title}
                            </Card.Title>

                            {/* Release Date */}
                            <Card.Text className="small mb-2 text-white">
                                Release: {movie.release_date || "N/A"}
                            </Card.Text>

                            {/* Rating */}
                            <div className="d-flex align-items-center mb-3 justify-content-center">
                                <FaStar className="text-warning me-2" />
                                <span>{movie.vote_average.toFixed(1)} / 10</span>
                            </div>

                            {/* Actions */}
                            <div className="d-flex gap-3 mb-3 justify-content-center">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Add to Favorite</Tooltip>}>
                                    <span
                                        className="icon-btn"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => addToFavorite(movie.id, setFavorites)}
                                    >
                                        <FaHeart
                                            size={22}
                                            color={favorites?.[movie.id] ? "red" : "white"}
                                            className="hover-glow"
                                        />
                                    </span>
                                </OverlayTrigger>

                                <OverlayTrigger placement="top" overlay={<Tooltip>Add to List</Tooltip>}>
                                    <span className="icon-btn text-info hover-glow">
                                        <FaListUl size={22} />
                                    </span>
                                </OverlayTrigger>

                                <OverlayTrigger placement="top" overlay={<Tooltip>Add to Watchlist</Tooltip>}>
                                    <span className="icon-btn text-warning hover-glow">
                                        <FaBookmark size={22} />
                                    </span>
                                </OverlayTrigger>

                                <OverlayTrigger placement="top" overlay={<Tooltip>Play Trailer</Tooltip>}>
                                    <TrailerButton movieId={movie.id} />
                                </OverlayTrigger>
                            </div>

                            {/* Details Button */}
                            <Nav.Link as={NavLink} to={`/movie/${movie.id}`}>
                                <Button
                                    className="w-75 fw-semibold"
                                    style={{
                                        background: "linear-gradient(90deg, #FFD700, #FFA500)",
                                        border: "none",
                                        color: "#000",
                                    }}
                                >
                                    View Details
                                </Button>
                            </Nav.Link>
                        </Card.Body>
                    </Card>

                ))}
            </div>
        </div>
    );
}

export default Section;
