import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function ShippingScreen() {
  const [shippingData, setShippingData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(shippingData);
  };

  function handleChange(e) {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  }

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
        <Typography component="h1" variant="h5">
          Shipping Details
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="Shipping Address"
            name="address"
            autoComplete="address"
            autoFocus
            onChange={(e) => handleChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="city"
            label="City"
            id="city"
            autoComplete="city"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="postalCode"
            label="Postal Code"
            id="postalCode"
            autoComplete="postalCode"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="country"
            label="Country"
            id="country"
            autoComplete="country"
            onChange={(e) => handleChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ShippingScreen;
