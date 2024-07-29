import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { fetchProducts } from "../redux/actions/productAction";
import { ProductCard, Loader, Search } from "../components/index";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "@mui/material/slider";
import {useAlert} from "react-alert";

const categories = ["Laptop", "Phone", "Top", "Footwear", "Basic"];

const ProductsPage = () => {
  const alert = useAlert();
  const [price, setPrice] = useState([0, 30000]);
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
        const clamped = Math.min(newPrice[0], 30000 - minDistance);
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
    <div className="my-3">
      <div className="sm:w-full md:w-1/4 mx-auto my-2">
        <Search navigate={navigate} />
      </div>
      <div className="flex flex-col-reverse lg:flex-row justify-center">
        <div className="w-52 lg:w-1/4 lg:mx-auto">
          <div className="w-full mx-auto my-2">
            <p className="font-normal text-lg text-center border">Price:</p>
            <Slider
              getAriaLabel={() => "Minimum distance shift"}
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              getAriaValueText={pricetext}
              disableSwap
              min={0}
              max={30000}
            />
          </div>
          <div>
            <p className="font-normal text-lg">Categories:</p>
            <ul>
              {categories.map((category) => (
                <li
                  className="text-sm text-gray-500 hover:text-red-500 cursor-pointer text-start ml-3"
                  onClick={() => setCategory(category)}
                  key={category}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p>Reviews</p>
            <Slider
              value={ratings}
              onChange={(event,newRatings) => setRatings(newRatings)}
              aria-label="Temperature"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2 lg:mx-28 md:mx-4">
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
          pageLinkClassName="px-3 py-1 bg-gray-200 border border-gray-300 rounded hover:bg-gray-400"
          previousClassName="mx-1"
          previousLinkClassName="px-3 py-1 bg-gray-100 border border-gray-300 rounded hover:bg-gray-400"
          nextClassName="mx-1"
          nextLinkClassName="px-3 py-1 bg-gray-100 border border-gray-300 rounded hover:bg-gray-400"
          breakClassName="mx-1"
          breakLinkClassName="px-3 py-1 border border-gray-300 rounded"
          activeClassName="bg-gray-300"
          className="m-3 flex justify-center"
        />
      )}
    </div>
  );
};

export default ProductsPage;
