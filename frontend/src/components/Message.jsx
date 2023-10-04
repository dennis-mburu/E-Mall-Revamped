import React from "react";
import { Alert } from "react-bootstrap";

function Message({ variant = "info", children }) {
  return (
    <Alert className="mt-3" variant={variant}>
      {children}
    </Alert>
  );
}

export default Message;
