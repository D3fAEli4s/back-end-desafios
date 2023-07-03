import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);
router.get("/:pid", getProductById);
router.post("/", createProduct);
//router.post("/", uploader.array("thumbnails", 5), addProduct);
router.put("/:pid", updateProduct);
router.delete("/:pid", deleteProduct);

export default router;

