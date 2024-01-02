import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../slices/authApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      try {
        const res = await updateProfile({ name, email, password }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (error) {
        console.log(error);
        toast.error(error.data.message || error.data);
      }
    }
  }

  return (
    <Row>
      <Col md={5}>
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              //   boxShadow: 3,
              borderRadius: 2,
              px: 4,
              py: 6,
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Profile Details
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                type="email"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              <TextField
                type="password"
                margin="normal"
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                type="password"
                margin="normal"
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="confirm password"
                autoFocus
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update Profile
              </Button>
            </Box>
          </Box>
        </Container>
      </Col>
      <Col>
        <Box
          sx={{
            // boxShadow: 3,
            // borderRadius: 2,
            // // px: 4,
            // py: 6,
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Previous Orders
          </Typography>
        </Box>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
