const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
exports.auth = async (req, res, next) => {
  if (req.session.user) {
    const { accessToken } = req.session.user;
    if (accessToken) {
      const { _id, role } = jwt.verify(accessToken, SECRET_KEY);
      req.user = { _id, role };
      next();
    } else {
      // req.flash("error", "Login Required");
      if (req.xhr) {
        return res
          .status(401)
          .json({ success: false, message: "Login Required" });
      } else {
        return res.redirect("/");
      }
    }
  } else if (req.xhr) {
    const accessToken = req.headers.authorization;
    if (accessToken) {
      const { _id, role } = jwt.verify(accessToken.split(" ")[1], SECRET_KEY);
      req.user = { _id, role };
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Login Required" });
    }
  } else {
    if (req.xhr) {
      return res
        .status(401)
        .json({ success: false, message: "Login Required" });
    } else {
      return res.redirect("/login");
    }
  }

  /**
   * For PCMall APP
   */
  // if (req.headers["X-Powered-By"]) {
  //   const accessToken = req.headers.authorization;
  //   if (accessToken) {
  //     const { _id, role } = jwt.verify(accessToken, SECRET_KEY);
  //     req.user = { _id, role };
  //     next();
  //   } else {
  //     return res
  //       .status(401)
  //       .json({ status: "error", message: "Login Required" });
  //   }
  // } else {
  //   return res.status(401).json({ status: "error", message: "Login Required" });
  // }
};

exports.isCustomer = async (req, res, next) => {
  if (req.user.role === "customer") {
    req.user = req.user;
    next();
  }
};
exports.isAdmin = async (req, res, next) => {
  if (req.user.role === "admin") {
    req.user = req.user;
    next();
  }
};
