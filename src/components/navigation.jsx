import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../styles/navigation.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Navbar
      fixed="top"
      className={"bg-body-tertiary"}
      expand="lg"
    >
      <Container>
        <Navbar.Brand href="#">
        <img src="haxybaxy.svg" alt="Logo" height="40" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavClick("intro")}>Home</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("aboutme")}>About Me</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("experience")}>Experience</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("projects")}>Projects</Nav.Link>
          </Nav>
          <Nav className="ml-auto d-flex flex-row justify-content-end">
            <Nav.Link href="mailto:zaidksaheb@gmail.com" className="mx-2">
              <EmailRoundedIcon style={{ fontSize: 20 }} />
            </Nav.Link>
            <Nav.Link
              href="https://github.com/haxybaxy"
              target="_blank"
              className="mx-2">
              <GitHubIcon style={{ fontSize: 19 }} />
            </Nav.Link>
            <Nav.Link
              href="https://www.linkedin.com/in/zaidalsaheb"
              target="_blank"
              className="mx-2"
            >
              <LinkedInIcon style={{ fontSize: 21 }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
