import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../context/ThemeContext";
import "../styles/navigation.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();

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
              <EmailRoundedIcon className="nav-icon" style={{ fontSize: 20 }} />
            </Nav.Link>
            <Nav.Link
              href="https://github.com/haxybaxy"
              target="_blank"
              className="mx-2">
              <GitHubIcon className="nav-icon" style={{ fontSize: 19 }} />
            </Nav.Link>
            <Nav.Link
              href="https://www.linkedin.com/in/zaidalsaheb"
              target="_blank"
              className="mx-2"
            >
              <LinkedInIcon className="nav-icon" style={{ fontSize: 21 }} />
            </Nav.Link>
            <div className="theme-toggle mx-2" onClick={toggleTheme}>
              {theme === 'light' ? (
                <DarkModeIcon className="nav-icon" style={{ fontSize: 20 }} />
              ) : (
                <LightModeIcon className="nav-icon" style={{ fontSize: 20 }} />
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
