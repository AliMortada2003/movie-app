import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip, Badge, Carousel } from "react-bootstrap";
import { FaHeart, FaListUl, FaBookmark, FaPlay, FaCamera } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";
import AllTrailes from "../Reusable/AllTrailes";

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [images, setImages] = useState([]);
    const imageBaseUrl = "https://image.tmdb.org/t/p/original";

    const options = {
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzA1ZTJkYWQ2OTVkZTMzZWNiMmQyOWVkYTZiMDM0MiIsIm5iZiI6MTczMDkzMDgzNi40NjIwMDAxLCJzdWIiOiI2NzJiZTg5NDY5YjgxZTQ4MzczMWY1NzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AT_BTdw_OW2lcZ1RpvzdFUUCAubuwnnv2ZAE95PQd_k",
        },
    };

    useEffect(() => {
        // تفاصيل الفيلم
        axios
            .get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then((res) => setMovie(res.data))
            .catch((err) => console.error(err));

        // صور الفيلم (بوسترات + باك دروب)
        axios
            .get(`https://api.themoviedb.org/3/movie/${id}/images`, options)
            .then((res) => {
                setImages(res.data.posters); // دمج البوسترات مع الباك دروب
            })
            .catch((err) => console.error(err));
    }, [id]);
    const images2 = images.slice(0, 50)
    return (
        <Container className="py-5 text-light">
            <Row>
                {/* صورة الفيلم الرئيسية */}
                <Col md={5}>
                    <img
                        src={imageBaseUrl + movie.poster_path}
                        alt={movie.title}
                        className="img-fluid rounded-3 shadow"
                    />
                </Col>
                {/* تفاصيل الفيلم */}
                <Col md={7}> <h2 className="text-warning">
                    {movie.title}</h2>
                    <p className="fst-italic text-muted">{movie.tagline}</p>
                    <p>{movie.overview}</p> <p> <strong>Original Title:</strong> {movie.original_title} </p>
                    <p> <strong>Release Date:</strong> {movie.release_date} </p>
                    <p> <strong>Status:</strong> {movie.status} </p>
                    <p> <strong>Runtime:</strong> {movie.runtime} min </p>
                    <p> <strong>Language:</strong>{" "} {movie.spoken_languages?.map((lang) => lang.english_name).join(", ")} </p>
                    <p> <strong>Origin Country:</strong>{" "} {movie.origin_country?.join(", ")} </p>
                    <p> <strong>Genres:</strong>{" "} {movie.genres?.map((g) => (<Badge bg="secondary" key={g.id} className="me-2"> {g.name} </Badge>))} </p>
                    <p> <strong>Rating:</strong> ⭐ {movie.vote_average} / 10 ({movie.vote_count} votes) </p>
                    <p> <strong>Budget:</strong> ${movie.budget?.toLocaleString()} </p>
                    <p> <strong>Revenue:</strong> ${movie.revenue?.toLocaleString()} </p>
                    <p> <strong>Popularity:</strong> {movie.popularity} </p>
                    <p> <strong>Homepage:</strong>{" "} {movie.homepage && (<a href={movie.homepage} target="_blank" rel="noreferrer" className="text-info"> {movie.homepage} </a>)} </p>
                    {/* أيقونات الأكشن */}
                    <div className="d-flex gap-4 mt-3">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Add to Favorite</Tooltip>}>
                            <span className="icon-btn text-danger"><FaHeart size={24} /></span>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Add to List</Tooltip>}>
                            <span className="icon-btn text-info"><FaListUl size={24} /></span>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Add to Watchlist</Tooltip>}>
                            <span className="icon-btn text-warning"><FaBookmark size={24} /></span>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Play Trailer</Tooltip>}>
                            <span className="icon-btn text-success"><FaPlay size={24} /></span>
                        </OverlayTrigger>
                    </div>
                </Col>
            </Row>
            <hr />
            {/* البوسترات في سلايدر */}
            <Container className="my-5 ">
                {images2.length > 0 && (
                    <>
                        <h2 className="d-flex gap-3 shadow  text-light fw-bold align-items-center my-5"><FaCamera color="orange"/> Movie Posters</h2>
                        <div className="poster-scroll">
                            {images2.map((img, index) => (
                                <div className="poster-card" key={index}>
                                    <img
                                        className="img-fluid rounded shadow"
                                        src={imageBaseUrl + img.file_path}
                                        alt={`poster-${index}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </Container>
            <AllTrailes movieId={id} />
        </Container>
    );
}
