import mongoose from "mongoose";
import {config} from "../config/config.js";

export let productDAO;

switch (config.persistence) {
  case "MONGO":
    mongoose.connect(config.dbUrl);
    const {productMongo} = await import("./mongo/product.dao.js");
    productDAO = productMongo;
    break;

  case "MEMORY":
    const contactMemory = await import("./memory/user.memory.js");
    productDAO = contactMemory;
    break;
}