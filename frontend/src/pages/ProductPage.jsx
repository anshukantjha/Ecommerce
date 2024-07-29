import React, { useEffect } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useAlert } from "react-alert";

import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../redux/actions/productAction";
import { useParams } from "react-router-dom";
import { Button, Input } from "../components/index";
import ReactStars from "react-rating-stars-component";

const ProductPage = () => {
  const alert = useAlert();
  const { id } = useParams();
  const { product, loading, error } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(fetchProduct(id));
  }, [dispatch, id]);
  console.log(product);
  return (
    <div className="my-2 lg:my-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-6 gap-6">
            <div className="flex items-center justify-center border-2 p-4 rounded-lg">
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
                    <div
                      key={image.public_url}
                      className="flex items-center justify-center"
                    >
                      <img
                        className="object-cover h-64 w-full rounded-2xl"
                        src={image.public_url}
                        alt={`Product ${index + 1}`}
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div className="border-2 p-6 rounded-lg shadow-lg bg-white">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-600">Product ID: {product._id}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <ReactStars
                    count={5}
                    isHalf={true}
                    value={product.ratings}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <span className="ml-2 text-gray-600">
                    ({product.ratings})
                  </span>
                </div>
                <span className="text-gray-600">
                  {product.noOfReviews} Reviews
                </span>
              </div>
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-green-600 mb-2">
                  ${product.price}
                </h1>
                <div className="flex items-center mb-4">
                  <Button className="border border-gray-300 p-2">-</Button>
                  <Input
                    type="number"
                    className=" border-gray-300 text-center cursor-not-allowed"
                    readOnly
                  />

                  <Button className="border border-gray-300 p-2">+</Button>
                </div>
                <Button className="bg-blue-600 text-white p-2 rounded w-full">
                  Add to Cart
                </Button>
              </div>
              <div className="mb-6">
                <h1 className="text-lg font-semibold">Status:</h1>
                <h1
                  className={
                    product.stock < 1 ? "text-red-500" : "text-green-700"
                  }
                >
                  {product.stock < 1 ? "Out Of Stock" : "In Stock"}
                </h1>
              </div>
              <div>
                <span className="font-semibold">Description:</span>
                <p className="font-light text-sm text-gray-500 mt-2">
                  {product.description}
                </p>
              </div>
              <div className="mt-2">
                <Button className="bg-purple-500 ">Submit Review</Button>
              </div>
            </div>
          </div>
          <div className="mx-2 lg:mx-4">
            <h1 className="text-center mx-auto border-b-2 text-xl w-1/4 mb-4 lg:mb-6">
              REVIEWS
            </h1>
            <div className="flex gap-2 overflow-x-auto scroll-smooth scroll-m-0 scroll-p-0">
             
              {product.reviews && product.reviews.length > 0 ? (product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border-2 shadow-xl p-2 rounded-2xl w-full min-w-[250px]"
                  >
                    <div className="">
                      <h1 className="">{review.name}</h1>
                      <div className="flex items-center gap-0">
                        <ReactStars
                          count={5}
                          isHalf={true}
                          value={review.rating}
                          size={15}
                          activeColor="#ffd700"
                        />
                        <span className="ml-2 text-gray-600">
                          ({review.rating})
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm">
                      {review.comment}
                    </div>
                  </div>
                ))):(<div className="text-center font-thin text-2xl mx-auto">NO REVIEWS YET :)</div>)
                }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
