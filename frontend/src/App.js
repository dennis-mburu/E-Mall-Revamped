import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header></Header>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
