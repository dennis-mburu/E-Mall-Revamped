import React from "react";
import { Alert } from "react-bootstrap";

function Message({ variant = "info", children, style }) {
  return (
    <Alert className="mt-3" variant={variant} style={style}>
      {children}
    </Alert>
  );
}

export default Message;
