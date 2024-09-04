import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct, newReview } from "../../redux/actions/productAction";
import { useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Rating,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addItemsToCart } from "../../redux/actions/cartAction";
import { NEW_REVIEW_RESET } from "../../redux/constants/productConstants";
import ReactStars from "react-rating-stars-component";

const ProductPage = () => {
  const alert = useAlert();
  const { id } = useParams();
  const { product, loading } = useSelector((state) => state.product);
  const { success } = useSelector((state) => state.newReview);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(fetchProduct(id));
  }, [dispatch, id, success]);

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function increaseQuantity() {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  }

  function handleAddToCart() {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item added to Cart");
  }

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  return (
    <Box className="my-2 lg:my-4">
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <Box>
          <Box className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-6 gap-6">
            <Box className="flex items-center justify-center border-2 p-4 rounded-lg">
              <Carousel
                className="w-full"
                showThumbs={false}
                showIndicators={true}
                showStatus={false}
                infiniteLoop={true}
                useKeyboardArrows={true}
                autoPlay={true}
                interval={2000}
              >
                {product.images &&
                  product.images.map((image, index) => (
                    <Box
                      key={image.public_url}
                      className="flex items-center justify-center"
                    >
                      <img
                        className="object-cover h-64 w-full rounded-2xl"
                        src={image.url}
                        alt={`Product ${index + 1}`}
                      />
                    </Box>
                  ))}
              </Carousel>
            </Box>

            <Box className="border-2 p-6 rounded-lg shadow-lg bg-white">
              <Box className="mb-6">
                <Typography
                  variant="h4"
                  component="h1"
                  className="font-bold mb-2"
                >
                  {product.name}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Product ID: {product._id}
                </Typography>
              </Box>

              <Box className="mb-6">
                <Box className="flex items-center mb-2">
                  <ReactStars
                    count={5}
                    isHalf={true}
                    value={product.ratings}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <Typography variant="body2" className="ml-2 text-gray-600">
                    ({product.ratings})
                  </Typography>
                </Box>
                <Typography variant="body2" className="text-gray-600">
                  {product.noOfReviews} Reviews
                </Typography>
              </Box>

              <Box className="mb-6">
                <Typography variant="h5" className="text-green-600 mb-2">
                  ${product.price}
                </Typography>

                <Box className="flex items-center mb-4">
                  <IconButton
                    onClick={decreaseQuantity}
                    className="border border-gray-300 p-2"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    type="number"
                    className="border-gray-300 text-center cursor-not-allowed"
                    value={quantity}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <IconButton
                    onClick={increaseQuantity}
                    className="border border-gray-300 p-2"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>

                <Button
                  startIcon={<ShoppingCartIcon />}
                  disabled={product.stock < 1}
                  onClick={handleAddToCart}
                  className="bg-blue-600 text-white p-2 rounded w-full"
                  variant="contained"
                >
                  Add to Cart
                </Button>
              </Box>

              <Box className="mb-6">
                <Typography variant="body1" className="font-semibold">
                  Status:
                </Typography>
                <Typography
                  variant="body1"
                  className={
                    product.stock < 1 ? "text-red-500" : "text-green-700"
                  }
                >
                  {product.stock < 1 ? "Out Of Stock" : "In Stock"}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" className="font-semibold">
                  Description:
                </Typography>
                <Typography
                  variant="body2"
                  className="font-light text-sm text-gray-500 mt-2"
                >
                  {product.description}
                </Typography>
              </Box>

              <Box className="mt-2">
                <Button
                  onClick={submitReviewToggle}
                  className="bg-purple-500 text-white"
                  variant="contained"
                >
                  Submit Review
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className="mx-2 lg:mx-4">
            <Typography
              variant="h5"
              className="text-center mx-auto border-b-2 text-xl w-1/4 mb-4 lg:mb-6"
            >
              REVIEWS
            </Typography>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
              className="p-4 md:p-6"
            >
              <DialogTitle className="text-center text-xl font-semibold">
                Submit Review
              </DialogTitle>
              <DialogContent className="flex flex-col gap-4">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                  className="self-center"
                />
                <TextField
                  placeholder="Write your review here..."
                  multiline
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  variant="outlined"
                  className="w-full"
                />
              </DialogContent>
              <DialogActions className="flex justify-between px-4">
                <Button
                  onClick={submitReviewToggle}
                  color="secondary"
                  className="text-gray-500"
                >
                  Cancel
                </Button>
                <Button
                  onClick={reviewSubmitHandler}
                  color="primary"
                  variant="contained"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            <Box className="flex gap-2 overflow-x-auto scroll-smooth scroll-m-0 scroll-p-0">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <Box
                    key={index}
                    className="border-2 shadow-xl p-2 rounded-2xl w-full min-w-[250px]"
                  >
                    <Box>
                      <Typography variant="body2" className="font-semibold">
                        {review.name}
                      </Typography>
                      <Box className="flex items-center gap-0">
                        <ReactStars
                          count={5}
                          isHalf={true}
                          value={review.rating}
                          size={15}
                          activeColor="#ffd700"
                        />
                        <Typography
                          variant="body2"
                          className="ml-2 text-gray-600"
                        >
                          ({review.rating})
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      className="text-gray-500 text-sm"
                    >
                      {review.comment}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography
                  variant="h6"
                  className="text-center font-thin mx-auto"
                >
                  NO REVIEWS YET :)
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductPage;
