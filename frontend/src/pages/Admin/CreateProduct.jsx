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
import { NEW_PRODUCT_RESET } from "../../redux/constants/productConstants";
import { createProduct } from "../../redux/actions/productAction";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Sidebar from "./Sidebar";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // Extract form data
    const name = data.get("name");
    const price = data.get("price");
    const description = data.get("description");
    const category = data.get("category");
    const stock = data.get("stock");
    const images = data.getAll("images"); // Get all selected files

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    console.log(name, price, description, category, stock, images);

    dispatch(createProduct(myForm));
  };

  return (
    <>
      <Helmet>
        <title>Create Product</title>
      </Helmet>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100">
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Create Product
            </h1>

            <div className="mb-4 flex items-center">
              <SpellcheckOutlined className="mr-2 text-gray-600" />
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 flex items-center">
              <AttachMoneyOutlined className="mr-2 text-gray-600" />
              <input
                type="number"
                name="price"
                placeholder="Price"
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 flex items-center">
              <DescriptionOutlined className="mr-2 text-gray-600" />
              <textarea
                name="description"
                placeholder="Product Description"
                cols="30"
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="mb-4 flex items-center">
              <AccountTreeOutlined className="mr-2 text-gray-600" />
              <select
                name="category"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <StorageOutlined className="mr-2 text-gray-600" />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
