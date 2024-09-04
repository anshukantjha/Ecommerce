import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { Button,CartItem } from "../../components/index";
import { removeItemsFromCart } from "../../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";

const CartPage = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [grossAmount, setGrossAmount] = useState(0);

  const deleteItemCard = (id) => {
    dispatch(removeItemsFromCart(id));
    alert.success("Item removed Successfully");
  };

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setGrossAmount(total);
  }, [cartItems]);

  return (
    <>
      <h1 className="text-2xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="min-h-60 flex flex-col justify-center items-center">
          <RemoveShoppingCartOutlined
            className="text-red-500 "
            fontSize="large"
          />
          <Typography>No Items in your Cart</Typography>
          <Link to={`/products`}><Button className="bg-slate-700">View Products</Button></Link>
        </div>
      ) : (
        <>
          <Link to={"/shipping"} className="flex justify-center my-2">
            <Button>Checkout ₹({grossAmount})</Button>
          </Link>
          {cartItems.map((item) => (
              <CartItem key={item.product} item={item} deleteItemCard={deleteItemCard} />
          ))}
        </>
      )}
    </>
  );
};

export default CartPage;
