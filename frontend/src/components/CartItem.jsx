import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import { DeleteOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { updateItemQuantity } from "../redux/actions/cartAction";
import { Link } from "react-router-dom";
const CartItem = ({ item, deleteItemCard }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(updateItemQuantity(item.product, quantity - 1));
    }
  }
  function increaseQuantity() {
    if (quantity < item.stock) {
      setQuantity(quantity + 1);
      dispatch(updateItemQuantity(item.product, quantity + 1));
    }
  }

  return (
    <div className="grid gap-2 grid-cols-[1fr_2fr]">
      <Link className=" mx-auto my-2" to={`/product/${item.product}`}>
        <img
          src={item.image}
          alt="Prod. Image"
          className="aspect-square h-36"
        />
      </Link>
      <div className=" max-h-36 grid grid-cols-2">
        <div>
          <h1 className="text-sm font-bold">{item.name}</h1>
          <div className="">
            <div className="flex items-center ">
              <Rating
                name="read-only"
                value={item.ratings}
                size="small"
                readOnly
              />
              <span className="ml-1 text-gray-600">({item.ratings})</span>
            </div>
          </div>
          <div className="">
            <h1 className="text-2xl font-semibold text-green-600">
              ₹{item.price}
            </h1>
            <div className="flex items-center w-1/6 text-xs -mt-3">
              <Button onClick={decreaseQuantity}>-</Button>

              <span className="font-semibold">{quantity}</span>

              <Button onClick={increaseQuantity}>+</Button>
            </div>
            <div className="-mt-2">
              <Typography>
                Total Price : {item.price * item.quantity}
              </Typography>
            </div>
          </div>
        </div>
        <div>
          <Button onClick={() => deleteItemCard(item.product)}>
            <DeleteOutline />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
