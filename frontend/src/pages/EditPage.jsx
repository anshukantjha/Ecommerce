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
import { updateProfile } from "../redux/actions/userAction";

const defaultTheme = createTheme();

export default function EditPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    dispatch(updateProfile(formData));
    navigate("/account")
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
            Edit
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
                  autoComplete="given-name"
                  name="name"
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  accept="image/*"
                  id="avatar"
                  name="avatar"
                  type="file"
                  fullWidth
                  sx={{
                    mt: 2,
                    mb: 2,
                    p: 1,
                    border: "1px solid #ced4da",
                    borderRadius: 1,
                    "&:hover": {
                      borderColor: "#80bdff",
                    },
                    "&.Mui-focused": {
                      borderColor: "#80bdff",
                      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
                    },
                  }}
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
