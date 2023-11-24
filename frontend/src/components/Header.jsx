import React from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  function handleLogout() {
    console.log("handle logout");
  }

  return (
    <header>
      <Navbar bg="primary" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="flex items-center">
              <svg
                className="fill-current h-8 w-8 mr-2 text-cyan-400"
                width="54"
                height="54"
                color="blue"
                viewBox="0 0 54 54"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
              </svg>
              <h1 className="font-bold text-white">E-MALL</h1>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="cart">
                <Nav.Link className="flex items-center mr-4 text-white">
                  <FaShoppingCart className="mr-1" />
                  Cart
                  {cartItems.length > 0 && (
                    <Badge className="ml-1" pill bg="success">
                      {cartItems.reduce((a, i) => a + i.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {/*TODO:  Style the dropdown, and add avatar/icons */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="user-info">
                  <LinkContainer to="/cart">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="flex items-center text-white">
                    <FaUser className="mr-1" />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
