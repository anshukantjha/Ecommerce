import React, { useEffect } from "react";
import { Button, Loader, ProductCard } from "../../components/index";
import {Helmet} from "react-helmet"
import { useSelector,useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/actions/productAction";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const alert = useAlert()
  const { products, loading, error } = useSelector(state => state.products);

  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(fetchProducts())
  }, [dispatch])
  

  return (
    <>
      <Helmet>
        <title>
          Ecommerce
        </title>
      </Helmet>
      <div className="bg-purple-600 min-h-96 flex flex-col justify-center items-center banner-clip gap-8">
        <h1 className="text-xl text-white text-center">Welcome to our Website</h1>
        <p className="text-3xl text-white text-center">Find amazing Products here</p>
        <Link to={'/products'}><Button className="hover:bg-red-600">Let's Go</Button></Link>
      </div>

      <div>
        <h1 className=" border-b-4 p-2 m-2 text-center w-1/4 mx-auto font-semibold ">
          Featured Products
        </h1>
        {loading ? <Loader/> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2 lg:mx-28 md:mx-4">
            {products && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default IndexPage;
