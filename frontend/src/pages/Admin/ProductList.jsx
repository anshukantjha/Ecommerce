import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import { Edit, DeleteForeverOutlined } from "@mui/icons-material";
import SideBar from "./Sidebar";
import { Helmet } from "react-helmet";
import {
  getAdminProduct,
  deleteProduct,
  clearErrors,
} from "../../redux/actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../redux/constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);
  const {loading, error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);


  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200 },
    { field: "name", headerName: "Name", minWidth: 350 },
    { field: "stock", headerName: "Stock", type: "number", minWidth: 150 },
    { field: "price", headerName: "Price", type: "number", minWidth: 270 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Link to={`/admin/product/${params.row.id}`}>
            <Edit />
          </Link>
          <Button onClick={() => deleteProductHandler(params.row.id)}>
            <DeleteForeverOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const rows = products
    ? products.map((item) => ({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      }))
    : [];

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!products) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Helmet>
        <title>ALL PRODUCTS - Admin</title>
      </Helmet>

      <div className="flex">
        <SideBar />
        <div className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">ALL PRODUCTS</h1>
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              className="bg-gray-50"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
