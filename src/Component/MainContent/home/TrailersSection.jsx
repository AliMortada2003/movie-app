import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaPlayCircle } from "react-icons/fa";

function TrailersSection({ title, data }) {
    const [show, setShow] = useState(false);
    const [activeTrailer, setActiveTrailer] = useState(null);

    const handleOpen = (trailerKey) => {
        setActiveTrailer(trailerKey);
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
        setActiveTrailer(null);
    };

    return (
        <div className="mb-5">
            <h2 className="fw-bold display-6 my-5">{title}</h2>
            <div className="d-flex overflow-auto gap-3 pb-3" style={{ scrollSnapType: "x mandatory" }}>
                {data.map(
                    (movie) =>
                        movie.trailerKey && (
                            <div
                                key={movie.id}
                                className="flex-shrink-0 position-relative rounded shadow"
                                style={{
                                    width: "300px",
                                    height: "170px",
                                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    cursor: "pointer",
                                    scrollSnapAlign: "start",
                                }}
                                onClick={() => handleOpen(movie.trailerKey)}
                            >
                                <div
                                    className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                                    style={{
                                        background: "rgba(0,0,0,0.5)",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <FaPlayCircle size={60} className="text-danger" />
                                </div>
                            </div>
                        )
                )}
            </div>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Body className="p-0">
                    {activeTrailer && (
                        <iframe
                            width="100%"
                            height="400"
                            src={`https://www.youtube.com/embed/${activeTrailer}`}
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
}

export default TrailersSection;
