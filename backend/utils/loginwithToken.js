import ApiResponse from "./apiResponse.js"
const loginwithToken = (user,res,msg) => {
    const token = user.getJWTToken();
    const options = {
      httpOnly: true,
      expires: Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    };
  
    return res
      .status(201)
      .cookie("token", token, options)
      .json(new ApiResponse(200, { user, token }, msg));
}

export default loginwithToken



