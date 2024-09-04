import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import {
  deleteReviews,
  getAllReviews,
  clearErrors,
} from "../../redux/actions/productAction";
import { DELETE_REVIEW_RESET } from "../../redux/constants/productConstants";
import { Button, TextField, Typography } from "@mui/material";
import { Delete, Star } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet } from "react-helmet";
import Sidebar from "./Sidebar";
import { Loader } from "../../components";

const ReviewsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");
  const [requested, setRequested] = useState(false); // Track if request has been made

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
      setRequested(true); // Set request as made
    } else {
      alert.error("Product ID must be 24 characters long");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      setRequested(false); // Reset request state if there's an error
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch(getAllReviews(productId)); // Refetch the reviews
      dispatch({ type: DELETE_REVIEW_RESET });
    }

    // Clear the request state when the productId changes
    setRequested(false);
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200 },
    { field: "user", headerName: "User", minWidth: 200 },
    { field: "comment", headerName: "Comment", minWidth: 350 },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      cellClassName: (params) =>
        params.value >= 4
          ? "text-green-600"
          : params.value >= 2
          ? "text-yellow-600"
          : "text-red-600",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => deleteReviewHandler(params.row.id)}
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<Delete />}
        >
          Delete
        </Button>
      ),
    },
  ];

  const rows = reviews
    ? reviews.map((item) => ({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      }))
    : [];

  return (
    <>
      <Helmet>
        <title>ALL REVIEWS - Admin</title>
      </Helmet>

      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100">
          <form
            onSubmit={productReviewsSubmitHandler}
            className="bg-white p-6 rounded-lg shadow-md space-y-6 max-w-md mx-auto"
          >
            <Typography
              variant="h4"
              className="text-center font-bold text-gray-700"
            >
              All Reviews
            </Typography>

            <div className="flex items-center space-x-3">
              <Star className="text-gray-600" />
              <TextField
                variant="outlined"
                fullWidth
                label="Product ID"
                placeholder="Enter Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading || productId === "" || requested}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>

          <div className="mt-10">
            {loading ? (
              <Loader />
            ) : reviews && reviews.length > 0 ? (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
                className="bg-white p-4 rounded-lg shadow-md"
              />
            ) : (
              <Typography variant="h6" className="text-center text-gray-600">
                No Reviews Found
              </Typography>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewsList;
