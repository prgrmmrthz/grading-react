import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Dropdown,
  NavItem,
  NavLink,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const MyNavbar = () => {
    const history = useHistory();
  const [auth, setAuth] = useContext(AuthContext);
  const logout = () => {
      setAuth({
        user: null,
        id: null,
        isAuthenticated: false
      })
      history.push("/login");
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>INTL INVENT</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link></Nav.Link>
      </Nav>
      <Form inline>
        <div className="mr-sm-2" />
        {auth.isAuthenticated && (
          <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}>Account Settings</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>logout()}>Log-out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        ;
      </Form>
    </Navbar>
  );
};

export default MyNavbar;
