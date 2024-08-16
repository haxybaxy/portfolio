import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../styles/navigation.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      const threshold = window.innerHeight;
      if (position > threshold) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Navbar
      fixed="top"
      className={`bg-body-tertiary ${showNavbar ? "visible" : "hidden"}`}
    >
      <Container>
        <Navbar.Brand href="#">haxybaxy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavClick("intro")}>Home</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("aboutme")}>About Me</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("experience")}>Experience</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("projects")}>Projects</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="mailto:zaidksaheb@gmail.com">
              <EmailRoundedIcon style={{ fontSize: 20 }} />
            </Nav.Link>
            <Nav.Link href="https://github.com/haxybaxy" target="_blank">
              <GitHubIcon style={{ fontSize: 19 }} />
            </Nav.Link>
            <Nav.Link
              href="https://www.linkedin.com/in/zaidsaheb/"
              target="_blank"
            >
              <LinkedInIcon style={{ fontSize: 21 }} />
            </Nav.Link>
            <Nav.Link
              href="https://medium.com/@haxybaxy"
              target="_blank"
            >
              <BorderColorIcon style={{ fontSize: 20 }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
