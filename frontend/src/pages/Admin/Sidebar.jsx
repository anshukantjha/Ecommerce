import React from "react";
import logo from "../../images/logo.jpeg";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Collapse,
} from "@mui/material";
import {
  Dashboard,
  PostAddOutlined,
  AddOutlined,
  ListAltOutlined,
  PeopleOutlined,
  RateReviewOutlined,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";

const Sidebar = () => {
  const [openProducts, setOpenProducts] = React.useState(false);

  const handleToggleProducts = () => {
    setOpenProducts(!openProducts);
  };

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "background.paper",
        boxShadow: 3,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Link to="/">
          <Box
            component="img"
            src={logo}
            alt="Ecommerce"
            sx={{ width: "80%", margin: "20px auto", display: "block" }}
          />
        </Link>
        <List component="nav">
          <ListItem button component={Link} to="/admin/dashboard">
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={handleToggleProducts}>
            <ListItemIcon>
              <ListAltOutlined />
            </ListItemIcon>
            <ListItemText primary="Products" />
            {openProducts ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openProducts} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/admin/products"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <PostAddOutlined />
                </ListItemIcon>
                <ListItemText primary="All Products" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/admin/create-product"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AddOutlined />
                </ListItemIcon>
                <ListItemText primary="Create Product" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button component={Link} to="/admin/orders">
            <ListItemIcon>
              <ListAltOutlined />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button component={Link} to="/admin/users">
            <ListItemIcon>
              <PeopleOutlined />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={Link} to="/admin/reviews">
            <ListItemIcon>
              <RateReviewOutlined />
            </ListItemIcon>
            <ListItemText primary="Reviews" />
          </ListItem>
        </List>
      </Box>
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemText primary="Go to Store" />
        </Link>
      </Box>
    </Box>
  );
};

export default Sidebar;
