import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  const navigate = useNavigate();
  return (
    <ButtonGroup
      className="mb-4"
      variant="contained"
      aria-label="outlined primary button group"
    >
      {step1 ? (
        <Button onClick={() => navigate("/login")}>Sign In</Button>
      ) : (
        <Button disabled>Sign In</Button>
      )}
      {step2 ? (
        <Button onClick={() => navigate("/shipping")}>Shipping</Button>
      ) : (
        <Button disabled>Shipping</Button>
      )}
      {step3 ? (
        <Button onClick={() => navigate("/payment")}>Payment</Button>
      ) : (
        <Button disabled>Payment</Button>
      )}
      {step4 ? (
        <Button onClick={() => navigate("/placeorder")}>Place Order</Button>
      ) : (
        <Button disabled>Place Order</Button>
      )}
    </ButtonGroup>
  );
}

export default CheckoutSteps;
