import React, { useEffect, useState } from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../slices/authApiSlice";

function UserEditScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { id: userId } = useParams();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading: loadingUser,
    error,
  } = useGetUserByIdQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin }).unwrap();
      toast.success("User Updated Successfully");
      navigate(-1);
    } catch (error) {
      toast.error(error.data.message || error.data);
    }
  };

  if (loadingUser) return <Loader />;
  if (error)
    return (
      <Message variant="danger">{error.data.message || error.data}</Message>
    );
  return (
    <>
      {loadingUpdate && <Loader />}
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            py: 4,
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>Edit User</h3>
          <Box component="form" sx={{ width: "75%" }} onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              type="text"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              id="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="standard"
              type="email"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              }
              label="is Admin"
            />
            <br />
            <Button
              disabled={loadingUser || loadingUpdate}
              variant="contained"
              sx={{ mt: 2 }}
              type="submit"
            >
              Update User
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default UserEditScreen;
