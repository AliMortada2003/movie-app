import React, { useState, useEffect } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import axios from "axios";
import { FaPlayCircle } from "react-icons/fa";
import "./AllTrailes.css";

const AllTrailes = ({ movieId }) => {
    const [trailers, setTrailers] = useState([]);
    const [show, setShow] = useState(false);
    const [activeTrailer, setActiveTrailer] = useState(null);

    useEffect(() => {
        const fetchTrailers = async () => {
            try {
                const res = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
                    {
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzA1ZTJkYWQ2OTVkZTMzZWNiMmQyOWVkYTZiMDM0MiIsIm5iZiI6MTczMDkzMDgzNi40NjIwMDAxLCJzdWIiOiI2NzJiZTg5NDY5YjgxZTQ4MzczMWY1NzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AT_BTdw_OW2lcZ1RpvzdFUUCAubuwnnv2ZAE95PQd_k`,
                        },
                    }
                );

                const movieTrailers = res.data.results
                    .filter((video) => video.type === "Trailer" && video.site === "YouTube")
                    .slice(0, 6);

                setTrailers(movieTrailers);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTrailers();
    }, [movieId]);

    const trailers2 = trailers.slice(0,3)
    const handleOpen = (trailerKey) => {
        setActiveTrailer(trailerKey);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    return (
        <div className="mb-5">
            <h2 className="fw-bold display-6 my-5 text-warning">🎬 Trailers</h2>

            <Row className="g-4">
                {trailers2.map((trailer) => (
                    <Col key={trailer.id} md={3} lg={4}>
                        <div
                            className="position-relative rounded shadow trailer-thumb"
                            style={{
                                width: "100%",
                                height: "200px",
                                backgroundImage: `url(https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg)`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                cursor: "pointer",
                            }}
                            onClick={() => handleOpen(trailer.key)}
                        >
                            <div
                                className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                                style={{
                                    background: "rgba(0,0,0,0.4)",
                                    borderRadius: "8px",
                                }}
                            >
                                <FaPlayCircle size={60} className="text-warning" />
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Modal for playing trailer */}
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Body className="p-0">
                    {activeTrailer && (
                        <iframe
                            width="100%"
                            height="400"
                            src={`https://www.youtube.com/embed/${activeTrailer}?autoplay=1`}
                            title="Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded"
                        ></iframe>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AllTrailes;
