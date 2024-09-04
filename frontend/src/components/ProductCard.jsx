import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";


const ProductCard = ({ product }) => {
  return (
    <div className="bg-gray-200 rounded-2xl hover:-translate-y-1 hover:shadow-2xl ">
      <Link to={`/product/${product._id}`}>
        <img
          className=" w-full h-60 object-cover rounded-t-2xl"
          src={product.images[0]?.url}
          alt={product.name}
        />
        <div className="pl-2">
          <h1>{product.name}</h1>
          <div className="flex gap-1">
            <ReactStars value={product.ratings} isHalf={true} />
            <span>({product.noOfReviews})reviews</span>
          </div>
          <span
            className={
              product.price > 400
                ? "text-red-600 text-lg font-semibold"
                : "text-green-600 text-lg font-semibold"
            }
          >
            ${product.price}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
