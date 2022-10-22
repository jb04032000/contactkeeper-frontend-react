import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoLink from "../../utils/logoLink";
import { logOut } from "../../redux/slices/authSlice";

const authLinks = () => (
  <>
    <Link to="/register" className="text-decoration-none nav-item me-2">
      <Button variant="info" className=" mb-2 mb-lg-0">
        Register
      </Button>
    </Link>
    <Link to="/login" className="text-decoration-none nav-item">
      <Button variant="light">Login</Button>
    </Link>
  </>
);

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const userLinks = () => (
    <>
      <div className="mb-2 text-decoration-none nav-item me-2 fs-4">
        <span className="  mb-lg-0 text-info">Hello, {user && user.name}</span>
      </div>
      <Link to="/login" className="text-decoration-none nav-item">
        <Button variant="danger" onClick={() => dispatch(logOut())}>
          Log out
        </Button>
      </Link>
    </>
  );

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="py-3"
    >
      <Container>
        <Link to="/" className="text-decoration-none nav-item">
          <Navbar.Brand>
            <img
              alt=""
              src={logoLink}
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
            />
            Contact Keeper
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto"></Nav>
          <Nav>
            <Link to="/" className="text-decoration-none nav-item">
              <span className="nav-link">Home</span>
            </Link>
            <Link to="/about" className="text-decoration-none nav-item">
              <span className="nav-link">About</span>
            </Link>
            {isAuthenticated ? userLinks() : authLinks()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
