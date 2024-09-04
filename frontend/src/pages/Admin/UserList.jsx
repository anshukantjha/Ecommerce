import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from "../../redux/actions/userAction";
import { DELETE_USER_RESET } from "../../redux/constants/userConstants";
import { Delete, Edit } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import { Helmet } from "react-helmet";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 1 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.75,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex items-center space-x-2">
            <Link to={`/admin/user/${params.row.id}`}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="p-2 min-w-0"
              >
                <Edit />
              </Button>
            </Link>

            <Button
              variant="contained"
              color="secondary"
              size="small"
              className="p-2 min-w-0"
              onClick={() => deleteUserHandler(params.row.id)}
            >
              <Delete />
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = users
    ? users.map((item) => ({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      }))
    : [];

  return (
    <>
      <Helmet>
        <title>ALL USERS - Admin</title>
      </Helmet>

      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100">
          <Typography variant="h4" className="mb-6 text-gray-700 font-bold">
            All Users
          </Typography>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              className="bg-white"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersList;
