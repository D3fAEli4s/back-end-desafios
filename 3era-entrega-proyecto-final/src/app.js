/*import express from "express";
//import handlebars from "express-handlebars";
//import cookieParser from "cookie-parser";
import morgan from "morgan";
//import database from "./mongo.js";
import socket from "./socket.js";
//import passport from "passport";
//import initializePassport from "./config/passport.js";
import productsRouter from "./routes/product.router.js";
import cartsRouter from "./routes/carts.router.js";
//import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import __dirname from "./utils.js";
import { config } from "./config/config.js";
import { connect } from "./mongo.js";

// Initialization
const app = express();
const port = config.port || 8080;
// Settings
/*app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");*/

// Midlewares
/*app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(`${__dirname}/public`));
app.use(morgan("dev"));
//app.use(cookieParser());
//initializePassport();
//app.use(passport.initialize());

// Database connection
//database.connect();
connect();

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(port, (req, res) => {
  console.log("Listening on port 8080");
});

socket.connect(httpServer);*/


import express from "express";
import morgan from "morgan";
import { config } from "./config/config.js";
import { connect } from "./mongo.js";
import productsRouter from "./routes/product.router.js";

const app = express();

// Database connection
//database.connect();
connect();

// Midlewares
app.use(express.json());
app.use(morgan("dev"));

const port = config.port || 8080;


app.listen(port, () => {
  console.log("Listening on port 8080");
});

// Routes
app.use("/api/products", productsRouter);



