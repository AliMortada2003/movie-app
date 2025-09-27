import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function HeroSection({ heroMovie }) {
    return (
        <div
            className="text-white text-center d-flex flex-column justify-content-center align-items-center position-relative"
            style={{
                backgroundImage: heroMovie
                    ? `url(https://image.tmdb.org/t/p/original/${heroMovie.backdrop_path})`
                    : "url('/fallback.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "95vh",
                transition: "background-image 1s ease-in-out",
            }}
        >
            {/* Overlay */}
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    background: "rgba(0, 0, 0, 0.55)",
                    backdropFilter: "blur(1px)",
                }}
            ></div>

            {/* Content */}
            <div
                className="position-relative px-3 text-center"
                style={{ maxWidth: "850px" }}
            >
                <h1 className = "fw-bold display-4 mb-4">
                    Millions of <span className="text-warning">movies</span>, TV shows & people to discover. Explore now.
                </h1>

                <p className="fs-5 text-light mb-4 opacity-75">
                    {heroMovie ? heroMovie.title : "Discover Trending & Top Rated Movies"}
                </p>

                <Button
                    variant="warning"
                    size="lg"
                    as={Link}
                    to="/popular"
                    className="shadow-lg px-5 py-3 rounded-pill fw-semibold explore-btn"
                >
                    🎬 Explore Now
                </Button>
            </div>

        </div>
    );
}

export default HeroSection;
