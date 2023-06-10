import { Router } from "express";
import CartManager from "../controllers/Carts.js";

const router = Router();
const cartManager = new CartManager();
//Listar todos los carritos
router.get("/", async (req, res) => {
    const cart = await cartManager.getCarts();
    return res.send({ status: "Success", payload: cart });
});
//Listar un carrito
router.get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    let cart = await cartManager.getCartById(cid);

    if(cart === undefined)
    {
        return res.status(404).send({status: "Error", error: "cart not found"})
    }
    return res.send({status:"Succes", payload: cart});
});
//Crear un carrito
router.post("/", async (req, res) => {
    const createdCart = await cartManager.createCart();
    if (!createdCart) {
        return res
        .status(400)
        .send({ status: "error", error: "cart already exists" });
    }
    return res.status(201).send({ status: "success", payload: createdCart });
});
//Añadir un producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  let { quantity } = req.body;

  if(!quantity)
  {
    quantity = 1;
  }

  const newProduct = await cartManager.addProduct(cartId, productId, quantity);

  if (!newProduct) {
    return res
      .status(404)
      .send({ status: "Error", error: "Product could not be found" });
  }
  return res.send({
    status: "OK",
    message: "Product successfully added to the cart",
    payload: newProduct,
  });
});
//Añadir varios productos al carrito
router.post("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const products = req.body;

  const updatedCart = await cartManager.addProducts(cartId, products);
  if (!updatedCart)
    return res.status(400).send({ status: "error", error: "error" });

  return res.send({ status: "sucess", message: "cart updated" });
});
//Eliminar un producto del carrito
router.delete("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const removeProductByIds = await cartManager.removeProductById(cid, pid);

    if (!removeProductByIds) {
      return res
        .status(404)
        .send({ status: "Error", error: "Product could not be found" });
    }
    return res.status(201).send({status: "OK", message: "Product successfully removed to the cart"});
});
// Eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  const updatedCart = await cartManager.removeProducts(cartId);

  if (!updatedCart)
    return res.status(404).send({ status: "error", error: "cart not found" });

  return res.send({
    status: "sucess",
    message: "deleted all products from cart",
  });
});
//Actualiza el carrito con un arreglo de productos
router.put("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const body = req.body;
  const updateProducts = await cartManager.updateProduct(cid, body);

  if (!updateProducts) {
    return res
      .status(404)
      .send({ status: "Error", error: "Product could not be found" });
    }
  return res.status(201).send({status: "OK", message: "product successfully update to the cart", payload: updateProducts});
});
//Actualizar la cantidad de unidades de un producto que ya se encuentre en el carrito
router.put("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const {cantidad} = req.body;
    const cant = parseInt(cantidad);
    const updateProducts = await cartManager.updateProductQuantity(cid, pid , cant);
  
    if (!updateProducts) {
      return res
        .status(404)
        .send({ status: "Error", error: "Product could not be found" });
    }
    return res.status(201).send({status: "OK", message: "product successfully update to the cart", payload: updateProducts});
});

export default router;
