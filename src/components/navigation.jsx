import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../styles/navigation.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  return (
    <Navbar
      fixed="top"
      className="transparent-navbar"
      expand="lg"
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex flex-row">
            <Nav.Link href="mailto:zaidksaheb@gmail.com" className="mx-2">
              <EmailRoundedIcon style={{ fontSize: 20, color: 'white' }} />
            </Nav.Link>
            <Nav.Link
              href="https://github.com/haxybaxy"
              target="_blank"
              className="mx-2">
              <GitHubIcon style={{ fontSize: 19, color: 'white' }} />
            </Nav.Link>
            <Nav.Link
              href="https://www.linkedin.com/in/zaidalsaheb"
              target="_blank"
              className="mx-2"
            >
              <LinkedInIcon style={{ fontSize: 21, color: 'white' }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
