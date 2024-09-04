import React from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const AccountPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Helmet>
        <title>{`${user.name}'s Profile`}</title>
      </Helmet>

      <div className="container mx-auto py-12 px-4 lg:px-8 min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-lg shadow-lg">
            <img
              src={user.avatar?.url}
              className="w-48 h-48 rounded-full hover:scale-110 transition-transform"
              alt="Profile Pic"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/account/edit")}
              className="w-full"
            >
              Edit Profile
            </Button>
          </div>
          <div className="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-700">Name :</h2>
              <p className="text-lg text-gray-500">{user.name}</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-700">Email :</h2>
              <p className="text-lg text-gray-500">{user.email}</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-700">
                Joined On :
              </h2>
              <p className="text-lg text-gray-500">
                {String(user.createdAt).substring(0, 10)}
              </p>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/orders")}
              className="w-full mt-4"
            >
              My Orders
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/password/update")}
              className="w-full mt-2"
            >
              Update Password
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
