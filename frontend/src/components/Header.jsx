import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";

function Header() {
  return (
    <header>
      <Navbar bg="primary" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">E-Mall</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart" className="flex items-center mr-4">
                <FaShoppingCart className="mr-1" />
                Cart
              </Nav.Link>
              <Nav.Link href="/login" className="flex items-center">
                <FaUser className="mr-1" />
                Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
