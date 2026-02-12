import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import ThemeToggle from "../Theme/ThemeToggle";
import { themeContext } from "../../context/ThemeContext";
import { autContext } from "../../context/AuthenticationToken";
import { useNavigate } from "react-router-dom";
function NavScrollExample() {
  const { theme, setTheme } = useContext(themeContext);
  const { token, setToken } = useContext(autContext);
  const [isSticky, setIsSticky] = useState(false);
  const navFunc = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function Logout() {
    localStorage.removeItem("token");
    setToken(null);
    navFunc( "/authentication" )
  }

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
        <div className="d-flex align-items-center">
          <div className="d-lg-none ">
            <ThemeToggle />
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
        </div>

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink className="nav-link header-link" to="/">
              Home
            </NavLink>

            <NavLink className="nav-link header-link" to="/products">
              Shop
            </NavLink>
            {token && (
              <NavLink className="nav-link header-link" to="/profile">
                Profile
              </NavLink>
            )}
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
            {token ? (
              <li className="nav-link header-link cursor-pointer">
                <span onClick={Logout}>Logout</span>
              </li>
            ) : (
              <NavLink
                className="nav-link mx-lg-4 header-link"
                to="/authentication"
              >
                Login
              </NavLink>
            )}
          </Nav>
          <div className="theme-toggle-wrapper ms-2 d-none d-lg-block">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default React.memo(NavScrollExample);
