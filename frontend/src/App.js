import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <>
      <Header></Header>
      <main>
        <Container>
          <h1 className="text-3xl font-bold underline">Emall Revamped</h1>
          <HomeScreen></HomeScreen>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
