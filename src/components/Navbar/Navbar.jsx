import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import ThemeToggle from "../Theme/ThemeToggle";

function NavScrollExample() {
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"),
  );

  // state للـ sticky
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`navbar-transition ${isSticky ? "sticky-navbar" : ""} p-0`}
      data-bs-theme="dark"
      collapseOnSelect
    >
      <Container fluid>
        <Navbar.Brand className="p-0 header-brand" as={NavLink} to="/">
          Navbar scroll
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav>
            <NavLink className="nav-link mx-lg-4" to="/authentication">
              Login
            </NavLink>
          </Nav>
          <div className="theme-toggle-wrapper ms-2">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default React.memo(NavScrollExample);
