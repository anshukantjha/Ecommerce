import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import SideBar from "./Sidebar";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../redux/actions/userAction";
import { UPDATE_USER_RESET } from "../../redux/constants/userConstants";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import {
  MailOutlineOutlined,
  Person,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import { Loader } from "../../components";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const params = useParams();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user?.name || "");
      setEmail(user?.email || "");
      setRole(user?.role || "");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const updatedData = {
      name,
      email,
      role,
    };

    dispatch(updateUser(userId, updatedData));
  };

  return (
    <>
      <Helmet>
        <title>Update User</title>
      </Helmet>
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-6 bg-gray-100">
          {loading ? (
            <Loader />
          ) : (
            <form
              onSubmit={updateUserSubmitHandler}
              className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-6"
            >
              <Typography
                variant="h4"
                className="text-center font-bold text-gray-700"
              >
                Update User
              </Typography>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Person className="text-gray-600" />
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <MailOutlineOutlined className="text-gray-600" />
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <VerifiedUserOutlined className="text-gray-600" />
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      label="Role"
                      required
                    >
                      <MenuItem value="">Choose Role</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={updateLoading || !name || !email || !role}
                >
                  {updateLoading ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
