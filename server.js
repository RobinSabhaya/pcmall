require("dotenv").config();
const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const Emmiter = require("events");
const passport = require("passport");
const favicon = require("serve-favicon");
const compression = require("compression");
const cors = require("cors");
// const helmet = require("helmet");
const PORT = process.env.PORT || 8000;
const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8000/";
require("./db/conn");
require("./config/passport");
const route = require("./routes/index");
const webhookRoutes = require("./routes/webhooks");
//Express App Specific Stuffs
const app = express();
const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URL,
  collectionName: "session",
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// webhook routes
app.use(webhookRoutes);

app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(favicon(__dirname + "/public/image/favicon.ico"));
app.use(expressLayout);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.static(path.join(__dirname, "/public/image")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(compression({ level: 6 }));
app.set("views", [
  "views",
  "views/admin",
  "views/customer",
  "views/common",
  "views/auth",
  "views/error",
]);
app.set("view engine", "ejs");
app.use(route);
//Error handling Middleware
route.use((req, res) => {
  return res.render("Error_Page");
});

// Secure connection with SSL certificate
// const options = {
//   key: fs.readFileSync(path.join(__dirname, "./ecdsa.key")),
//   cert: fs.readFileSync(path.join(__dirname, "./ecdsa.crt")),
// };
// https.createServer(options, app);

//App Listen Specific Stuffs
const server = app.listen(PORT, () => {
  console.log(`Express App Is Now Running... on http://127.0.0.1:${PORT}/`);
});

const io = require("socket.io")(server);
const eventEmitter = new Emmiter();
app.set("eventEmitter", eventEmitter);
io.on("connection", (socket) => {
  socket.on("join", (orderId) => {
    socket.join(orderId);
  });
});

eventEmitter.on("orderUpdated", (data) => {
  io.to(`order_${data.id}`).emit("orderUpdated", data);
});
