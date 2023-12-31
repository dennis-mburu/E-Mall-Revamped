import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CheckoutSteps step1 step2 step3 />

        <Typography component="h1" variant="h5" className="mb-2">
          Payment Details
        </Typography>
        <FormControl
          component="form"
          sx={
            {
              // alignSelf: "self-start"
            }
          }
          onSubmit={handleSubmit}
        >
          <FormLabel id="payment-radio-buttons-group">Select Method</FormLabel>
          <RadioGroup
            aria-labelledby="payment-radio-buttons-group"
            name="payment-radio-buttons-group"
            value={paymentMethod}
            onChange={handleChange}
          >
            <FormControlLabel
              value="PayPal"
              control={<Radio />}
              label="PayPal or Credit Card"
            />
            <FormControlLabel
              value="M-Pesa"
              control={<Radio />}
              label="M-Pesa"
              //   disabled
            />
          </RadioGroup>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Continue
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
}

export default PaymentScreen;
