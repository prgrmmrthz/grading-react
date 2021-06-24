import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Form, Dropdown, NavItem, NavLink, Button } from "react-bootstrap";
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
    <Navbar className="sb-topnav" bg="dark" variant="dark" expand>
      <Navbar.Brand>INTL GRADING</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link>
          <button
            className="btn btn-link btn-sm order-1 order-lg-0"
            onClick={()=>{document.body.classList.toggle("sb-sidenav-toggled")}}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </Nav.Link>
      </Nav>
      <Form inline>
        <div className="mr-sm-2" />
        <Nav.Link href="https://m.me/vicgr8" target="_blank">
          For questions please contact me on Messenger
        </Nav.Link>
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
