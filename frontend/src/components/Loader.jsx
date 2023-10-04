import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <Spinner
      animation="border"
      role="status"
      variant="primary"
      className="w-24 h-24 mx-auto my-5 d-block"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loader;
