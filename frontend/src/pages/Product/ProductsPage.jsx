import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { fetchProducts } from "../../redux/actions/productAction";
import { ProductCard, Loader, Search } from "../../components/index";
import { useNavigate, useParams } from "react-router-dom";
import { Slider } from "@mui/material";
import { useAlert } from "react-alert";

const categories = ["Laptop", "SmartPhones", "Tops", "Footwear", "Attire"];

const ProductsPage = () => {
  const alert = useAlert();
  const [price, setPrice] = useState([0, 3000]);
  const [ratings, setRatings] = useState(3);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const keyword = params.keyword;
  const dispatch = useDispatch();
  const {
    products,
    resultPerPage,
    productsCount,
    error,
    loading,
    filteredProductCount,
  } = useSelector((state) => state.products);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(fetchProducts(keyword, pageNo, price, category, ratings));
  }, [dispatch, pageNo, keyword, price, category, ratings]);

  const pageCount = Number(Math.ceil(productsCount / resultPerPage));
  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  function pricetext(price) {
    return `₹${price}`;
  }

  const minDistance = 200;

  const handlePriceChange = (event, newPrice, activeThumb) => {
    if (!Array.isArray(newPrice)) {
      return;
    }

    if (newPrice[1] - newPrice[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newPrice[0], 3000 - minDistance);
        setPrice([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newPrice[1], minDistance);
        setPrice([clamped - minDistance, clamped]);
      }
    } else {
      setPrice(newPrice);
    }
  };

  return (
    <div className="my-6 min-h-screen">
      <div className="sm:w-full md:w-3/4 lg:w-1/2 mx-auto my-4">
        <Search navigate={navigate} />
      </div>
      <div className="flex flex-col-reverse lg:flex-row justify-between">
        <div className="w-full lg:w-1/4 lg:mx-auto bg-white p-4 rounded-lg shadow-lg">
          <div className="mb-6">
            <p className="font-semibold text-lg text-center mb-2">Price</p>
            <Slider
              getAriaLabel={() => "Minimum distance shift"}
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              getAriaValueText={pricetext}
              disableSwap
              min={0}
              max={3000}
            />
          </div>
          <div className="mb-6">
            <p className="font-semibold text-lg mb-2">Categories</p>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  className="text-sm text-gray-600 hover:text-red-500 cursor-pointer"
                  onClick={() => setCategory(category)}
                  key={category}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <p className="font-semibold text-lg mb-2">Reviews</p>
            <Slider
              value={ratings}
              onChange={(event, newRatings) => setRatings(newRatings)}
              aria-label="Ratings"
              defaultValue={3}
              getAriaValueText={pricetext}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={5}
            />
          </div>
        </div>
        <div className="w-full">
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          )}
        </div>
      </div>
      {resultPerPage < filteredProductCount && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-center mt-8"
          pageClassName="mx-1"
          pageLinkClassName="px-3 py-1 bg-gray-100 border border-gray-300 rounded hover:bg-gray-300"
          previousClassName="mx-1"
          previousLinkClassName="px-3 py-1 bg-gray-100 border border-gray-300 rounded hover:bg-gray-300"
          nextClassName="mx-1"
          nextLinkClassName="px-3 py-1 bg-gray-100 border border-gray-300 rounded hover:bg-gray-300"
          breakClassName="mx-1"
          breakLinkClassName="px-3 py-1 border border-gray-300 rounded"
          activeClassName="bg-gray-300 font-semibold"
          className="m-3 flex justify-center"
        />
      )}
    </div>
  );
};

export default ProductsPage;
