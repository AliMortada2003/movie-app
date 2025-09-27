import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { SiFireship } from "react-icons/si";
import { FaHeart, FaStar } from "react-icons/fa6";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { BiSolidMoviePlay } from "react-icons/bi";
import "./Navbar.css"
function Header() {
  return (
    <Navbar bg="dark"  expand="lg" className="p-4 border" data-bs-theme="dark" >
      <Container fluid>
        {/* Brand / Logo */}
        <Navbar.Brand as={NavLink} to="/" className="text-warning fs-2">
          Movie-APP <BiSolidMoviePlay />
        </Navbar.Brand>
        {/* Toggler */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Collapsible Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-center fs-5">
            <Nav.Link className='pointer'
              as={NavLink}
              to="popular"
            >
              Popular <SiFireship className="ms-1" size={22} />
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="toprated"
            >
              Top Rated <FaArrowAltCircleUp className="ms-1" size={22} />
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="favorite"
            >
              Favorite <FaHeart className="ms-1" size={22} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
