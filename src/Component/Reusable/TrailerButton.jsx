import React, { useState } from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import { FaPlay } from "react-icons/fa6";

const TrailerButton = ({ movieId }) => {
    const [show, setShow] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);

    const handleShow = async () => {
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
                {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzA1ZTJkYWQ2OTVkZTMzZWNiMmQyOWVkYTZiMDM0MiIsIm5iZiI6MTczMDkzMDgzNi40NjIwMDAxLCJzdWIiOiI2NzJiZTg5NDY5YjgxZTQ4MzczMWY1NzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AT_BTdw_OW2lcZ1RpvzdFUUCAubuwnnv2ZAE95PQd_k`, // 🔑 use your token
                    },
                }
            );

            const trailers = res.data.results.filter(
                (video) => video.type === "Trailer" && video.site === "YouTube"
            );

            if (trailers.length > 0) {
                setTrailerKey(trailers[0].key);
                setShow(true);
            } else {
                alert("No trailer found for this movie!");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <OverlayTrigger placement="top" overlay={<Tooltip>Play Trailer</Tooltip>}>
                <span className="icon-btn "><FaPlay color="green" size={24} onClick={handleShow} /></span>
            </OverlayTrigger>
            <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
                <Modal.Body className="p-0">
                    {trailerKey ? (
                        <iframe
                            width="100%"
                            height="400"
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="Movie Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <p className="text-center my-3">Trailer not available</p>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default TrailerButton;
