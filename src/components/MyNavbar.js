import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Form, Dropdown, NavItem, NavLink } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const MyNavbar = () => {
  const history = useHistory();
  const [auth, setAuth] = useContext(AuthContext);
  const logout = () => {
    setAuth({
      user: null,
      id: null,
      isAuthenticated: false,
    });
    history.push("/login");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>INTL GRADING</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link>
          <button
            className="btn btn-link btn-sm order-1 order-lg-0"
            id="sidebarToggle"
            href="#"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </Nav.Link>
      </Nav>
      <Form inline>
        <div className="mr-sm-2" />
        {auth.isAuthenticated && (
          <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}>Account Settings</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => logout()}>Log-out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        ;
      </Form>
    </Navbar>
  );
};

export default MyNavbar;
