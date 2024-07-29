import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Input from "@mui/material/Input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import { updatePassword } from "../redux/actions/userAction";


const defaultTheme = createTheme();

export default function PassUpdatePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const allPassword = {oldPassword,newPassword,confirmPassword};
    console.log(allPassword)
    dispatch(updatePassword(allPassword));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="oldPassword"
                  fullWidth
                  id="oldPassword"
                  label="Old Password"
                  autoFocus
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="newPassword"
                  label="New Password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
