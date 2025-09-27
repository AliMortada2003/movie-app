import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "./Foter.css"
import { NavLink } from "react-router-dom";
function Footer() {
    return (
        <footer className="footer bg-dark text-light py-5">
            <Container className="text-center">
                <Row className="gy-4">
                    {/* Brand / About */}
                    <Col md={4}>
                        <h3 className="text-warning fw-bold">Movie-APP</h3>
                        <p className="text-white small">
                            Discover the latest movies, trailers, and reviews. Stay connected
                            with your favorite films anytime, anywhere.
                        </p>
                    </Col>

                    {/* Quick Links */}
                    <Col md={4}>
                        <h5 className="text-warning mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Nav.Link as={NavLink} to={"/"} className="footer-link">Home</Nav.Link></li>
                            <li><Nav.Link as={NavLink} to={"popular"} className="footer-link">Popular Movie</Nav.Link></li>
                            <li><Nav.Link as={NavLink} to={"popular"} className="footer-link">Top Rated Movie</Nav.Link></li>                        </ul>
                    </Col>

                    {/* Social Media */}
                    <Col md={4}>
                        <h5 className="text-warning mb-3">Follow Us</h5>
                        <div className="d-flex align-items-center justify-content-center gap-3">
                            <a href="https://facebook.com" className="social-icon"><FaFacebookF /></a>
                            <a href="https://twitter.com" className="social-icon"><FaTwitter /></a>
                            <a href="https://instagram.com" className="social-icon"><FaInstagram /></a>
                            <a href="https://youtube.com" className="social-icon"><FaYoutube /></a>
                        </div>
                    </Col>
                </Row>

                <hr className="border-secondary my-4" />

                {/* Copyright */}
                <Row>
                    <Col className="text-center text-white small">
                        © {new Date().getFullYear()} <span className="text-warning">A.M.A</span>. All rights reserved.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
