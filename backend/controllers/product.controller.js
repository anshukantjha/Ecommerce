import Product from "../models/ProductModel.js";
import { ApiError } from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiFeatures from "../utils/ApiFeatures.js";

// anyone can acess
const getAllProducts = asyncHandler(async (req, res, next) => {
  const resultPerPage = 5;
  const productsCount = await Product.countDocuments();

  // Create the initial query using the ApiFeatures class
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  // Clone the query for counting filtered products
  let filteredProductsQuery = apiFeature.query.clone();
  let filteredProductCount = await filteredProductsQuery.countDocuments();

  // Apply pagination to the original query
  apiFeature.pagination(resultPerPage);

  // Execute the paginated query
  let products = await apiFeature.query;

  return res.status(200).json({
    products,
    resultPerPage,
    productsCount,
    filteredProductCount
  });
});

// Create Product --admin
const createProduct = asyncHandler(async (req, res, next) => {
  req.body.creator = req.user.id;
  const product = await Product.create(req.body);
  return res.status(201).json(new ApiResponse(200, product));
});

// Update Product --admin
const updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ApiError(500, "Product not found!"));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(201).json(new ApiResponse(200, product));
});

// Delete Product --admin
const deleteProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ApiError(500, "Product not found!"));
  }

  await product.deleteOne();

  return res
    .status(201)
    .json(new ApiResponse(200, "Product deleted Successfully"));
});

// Get single product details
const getProductDetails = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ApiError(500, "Product not found!"));
  }
  res.status(201).json(new ApiResponse(200, product));
});

// Create or update review of product

const createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.noOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, product, "Review added successfully"));
});

const getAllReviews = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }
  res.status(200).json(new ApiResponse(201, product.reviews));
});

const deleteReview = asyncHandler(async (req, res, next) => {
  const productId = req.query.productId;
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.revId.toString()
  );

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = avg / reviews.length;
  const noOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      noOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json(new ApiResponse(200, "Review deleted successfully"));
});

export {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  deleteReview,
  getAllReviews,
};
