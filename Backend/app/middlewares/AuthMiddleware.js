const jwt = require("jsonwebtoken");
const httpStatusCode = require("../utils/httpStatusCode");

const AuthCheck = async (req, res, next) => {
  const token =
    req?.body?.token ||
    req?.query?.token ||
    req?.headers?.["x-access-token"] ||
    req?.headers?.["authorization"];

  if (!token) {
    return res.status(httpStatusCode.BAD_REQUEST).json({
      success: false,
      message: "Token is required for access this url",
    });
  }

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req?.admin = decoded;
  } catch (err) {
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = AuthCheck;
