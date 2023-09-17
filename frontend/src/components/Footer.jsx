import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center">
            <p>E-mall v2 &copy; {currentYear}</p>
            <p>
              Made with <span>&#x2665;</span> by <span>Dennis Mburu </span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
