import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import {
  AccountTreeOutlined,
  DescriptionOutlined,
  StorageOutlined,
  SpellcheckOutlined,
  AttachMoneyOutlined,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  clearErrors,
  fetchProductDetails,
  updateProduct,
} from "../../redux/actions/productAction";
import { Helmet } from "react-helmet";
import { UPDATE_PRODUCT_RESET } from "../../redux/constants/productConstants";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const productId = params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(fetchProductDetails(productId));
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
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const previews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });

    setNewImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    dispatch(updateProduct(productId, formData));
  };

  return (
    <>
      <Helmet>
        <title>Update Product</title>
      </Helmet>
      <div className="flex">
        <Sidebar />
        <div className="w-full p-6 flex flex-col items-center">
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white shadow-md rounded-lg p-8"
          >
            <h1 className="text-2xl font-semibold mb-6 text-center">
              Update Product
            </h1>

            <div className="mb-4 flex items-center">
              <SpellcheckOutlined className="mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                required
                defaultValue={product ? product.name : ""}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 flex items-center">
              <AttachMoneyOutlined className="mr-2" />
              <input
                type="number"
                name="price"
                placeholder="Price"
                required
                defaultValue={product ? product.price : ""}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 flex items-center">
              <DescriptionOutlined className="mr-2" />
              <textarea
                name="description"
                placeholder="Product Description"
                defaultValue={product ? product.description : ""}
                cols="30"
                rows="1"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="mb-4 flex items-center">
              <AccountTreeOutlined className="mr-2" />
              <select
                name="category"
                defaultValue={product ? product.category : ""}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 flex items-center">
              <StorageOutlined className="mr-2" />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                required
                defaultValue={product ? product.stock : ""}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                className="w-full"
                onChange={handleFileChange}
              />
            </div>

            <div className="mb-4 flex flex-wrap gap-4">
              {product.images &&
                product.images.length > 0 &&
                product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt="Old Product Preview"
                    className="w-24 h-24 object-cover rounded-md shadow-md"
                  />
                ))}
              {imagePreviews.length > 0 &&
                imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt="New Product Preview"
                    className="w-24 h-24 object-cover rounded-md shadow-md"
                  />
                ))}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
