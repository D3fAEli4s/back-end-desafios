import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import passport from "passport";
import initializePassport from "../src/auth/passport.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import database from "./db.js";
import config from "./config.js";
import { __dirname } from "../src/util.js"


// Initialization
const app = express();
const PORT = process.env.PORT || 8080;

// Settings
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(morgan("dev"));

app.use(cookieParser());

// Database connection
database.connect();

initializePassport();
app.use(passport.initialize());

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);

app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`);
});