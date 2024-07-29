import React, { useEffect, useState } from "react";
import { Button, Input } from "./index";
import { useDispatch,useSelector } from "react-redux";

const Search = ({navigate}) => {
  const [keyword, setKeyword] = useState("")
  const dispatch = useDispatch();

    useEffect(() => {
      
    }, [dispatch])
    
    const submitHandler=()=>{
      if (keyword.trim()) {
        navigate(`/products/${keyword}`)
      }else{
       navigate(`/products`)
      }
    }

  return (
    <div className="flex sm:w-full">
      <Input placeholder="Search for Product" className="font-mono rounded-r-none" onChange={(e)=>setKeyword(e.target.value)}></Input>
      <Button  className="rounded-l-none" onClick={submitHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </Button>
    </div>
  );
};

export default Search;
