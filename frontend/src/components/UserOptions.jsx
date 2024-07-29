import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashBoardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAltOutlined";
import PersonIcon from "@mui/icons-material/Person";
import ExtiToAppIcon from "@mui/icons-material/ExitToApp";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/userAction.js";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

export default function PlaygroundSpeedDial() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const alert = useAlert();
  function orders() {
    navigate("/orders");
  }
  function profile() {
    if (isAuthenticated) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  }
  function logout() {
    dispatch(logoutUser());
    alert.success("Logout Successfull");
  }

  function dashboard() {
    navigate("/dashboard");
  }

  const actions = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: profile },
    { icon: <ExtiToAppIcon />, name: "Logout", func: logout },
  ];

  if (user?.role === "admin") {
    actions.unshift({
      icon: <DashBoardIcon />,
      name: "DashBoard",
      func: dashboard,
    });
  }

  return (
    <div className="relative">
      <SpeedDial
        className="absolute top-0 right-2 "
        ariaLabel="SpeedDial playground example"
        icon={<img src={user?.avatar?.url} alt="Profile" />}
        direction={"down"}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
