import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Loader } from "../components/index";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { loadUser } from "../redux/actions/userAction";

const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate,isAuthenticated])
  

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>{`${user.name}'s Profile`}</title>
          </Helmet>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 min-h-screen ">
            <div className=" flex flex-col justify-center items-center gap-4 shadow-lg ">
              <h1 className="text-2xl text-gray-400 text-start ">My Profile</h1>
              <img
                src={user?.avatar?.url}
                className="w-60 h-60 rounded-full hover:scale-105 transition-all"
                alt="Profile Pic"
              />
              <Button
                onClick={() => {
                  navigate("/account/edit");
                }}
              >
                Edit Profile
              </Button>
            </div>
            <div className="flex flex-col gap-5 shadow-xl justify-center items-center">
              <div>
                <h1 className="text-xl font-normal">Name :</h1>
                <p className="text-lg text-gray-500">{user.name}</p>
              </div>
              <div>
                <h1 className="text-xl font-normal">Email :</h1>
                <p className="text-lg text-gray-500">{user.email}</p>
              </div>
              <div>
                <h1 className="text-xl font-normal">Joined On :</h1>
                <p className="text-lg text-gray-500">
                  {String(user.createdAt).substring(0, 10)}
                </p>
              </div>
              <Button
                className="bg-slate-600"
                onClick={() => {
                  navigate("/orders");
                }}
              >
                My Orders
              </Button>
              <Button
                className="bg-slate-600"
                onClick={() => {
                  navigate("/password/update");
                }}
              >
                Update Password
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AccountPage;
