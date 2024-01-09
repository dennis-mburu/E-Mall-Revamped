import React from "react";
import { Button } from "@mui/material";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllUsersQuery } from "../../slices/authApiSlice";

function UserListScreen() {
  const navigate = useNavigate();

  const { data: users, isLoading, error, refetch } = useGetAllUsersQuery();

  async function handleDelete(id) {
    console.log("Delete");
  }

  if (isLoading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">{error.data.message || error.data}</Message>
    );

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">NAME</TableCell>
              <TableCell align="center">EMAIL</TableCell>
              <TableCell align="center">ADMIN</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow
                hover
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  //   cursor: "pointer",
                }}
                //   onClick={() => navigate(`/user/${user._id}`)}
              >
                <TableCell component="th" scope="row">
                  {user._id}
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </TableCell>
                <TableCell align="center">
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </TableCell>
                <TableCell align="center" style={{ display: "flex" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ marginRight: "1rem" }}
                    // disabled={loadingCreateProduct || LoadingDelete}
                    onClick={() => {
                      navigate(`/admin/users/${user._id}/edit`);
                    }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    // disabled={loadingCreateProduct || LoadingDelete}
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users.length === 0 && (
          <Message style={{ textAlign: "center" }}>No Users available</Message>
        )}
      </TableContainer>
    </>
  );
}

export default UserListScreen;
