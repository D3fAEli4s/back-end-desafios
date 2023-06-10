import { Router } from "express";
import ProductManager from "../controllers/Products.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  const options = {
    query: {},
    pagination: {
      limit: req.query.limit ?? 10,
      page: req.query.page ?? 1,
      sort: {},
    },
  };

  if (req.query.category) {
    options.query.category = req.query.category;
  }

  if (req.query.status) {
    options.query.status = req.query.status;
  }

  if (req.query.sort) {
    options.pagination.sort.price = req.query.sort;
  }

  const {
    docs: products,
    totalPages,
    prevPage,
    nextPage,
    page,
    hasPrevPage,
    hasNextPage,
  } = await productManager.getPaginatedProducts(options);

  const link = "/products?page=";

  const prevLink = hasPrevPage ? link + prevPage : link + page;
  const nextLink = hasNextPage ? link + nextPage : link + page;

  return res.send({
    status: "sucess",
    payload: products,
    totalPages,
    prevPage,
    nextPage,
    page,
    hasNextPage,
    hasPrevPage,
    prevLink,
    nextLink,
  });
});

router.get("/:pid", async (req, res) => {
    const pid = req.params.pid;
    const products = await productManager.getProductById(pid);
    if (!products) {
      return res
        .status(400)
        .send({ status: "error", error: "product does not exist" });
    }
    return res.status(200).send({ status: "Succes", payload: products});
});
  
router.post("/", async (req, res) => {
    const product = req.body;
    const createdProduct = await productManager.createProduct(product);
    if (!createdProduct) {
      return res
        .status(400)
        .send({ status: "error", error: "Product already exists" });
    }
    return res.status(201).send({ status: "success", payload: createdProduct });
});
  
router.put("/:pid", async (req, res) => {
    const pid = req.params.pid;
    const body = req.body;
    const updatedProduct = await productManager.updateProduct(pid, body);
   
    if (!updatedProduct) {
      return res
        .status(400)
        .send({ status: "error", error: "product does not exist" });
    }
    return res.status(201).send({ status: "Succes", payload: updatedProduct});
});
  
router.delete("/:pid", async (req, res) => {
    const pid = req.params.pid;
    const deletedProduct = await productManager.deleteProduct(pid);
   
    if (!deletedProduct) {
      return res
        .status(400)
        .send({ status: "error", error: "product does not exist" });
    }
    return res.send({ status: "success", message: "Product succesfully deleted"});
  
});


export default router;