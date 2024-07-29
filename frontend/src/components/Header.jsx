import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions";

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  return (
    <div className=" bg-gray-200 flex justify-between items-center px-4 md:px-5 w-full h-16">
      <div className="font-bold text-2xl text-red-500">
        <Link to={"/"}>Anshu</Link>
      </div>
      <ul className="hidden md:flex gap-5 font-semibold">
        <Link to={"/"} className="cursor-pointer">
          Home
        </Link>
        <Link to={"/"} className="cursor-pointer">
          About
        </Link>
        <Link to={"/"} className="cursor-pointer">
          Contact
        </Link>
      </ul>
      {/* <div>
        <Search />
      </div> */}

      {isAuthenticated ? (
        <UserOptions />
      ) : (
        <Link
          to={user ? "/account" : "/login"}
          className="p-2 shadow-lg rounded-3xl flex gap-1 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-5 h-5"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-6 h-6 bg-gray-300 rounded-full text-white"
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default Header;
