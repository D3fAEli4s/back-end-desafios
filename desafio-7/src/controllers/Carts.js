import cartModel from "../models/cart.js";

export default class CartManager {

  constructor() {}

  getCarts = async () => {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (error) {
      console.log(error);
    }
  };

  getCartById = async (id) => {
    try {
      let populatedCarts = await cartModel.findOne({ _id: id }).populate("products.product").lean();
      return populatedCarts;
    } catch (error) {
      console.log(error);
    }
  };

  createCart = async (cart) => {
    try {
      const cartCreated = await cartModel.create(cart);
      return cartCreated;
    } catch (error) {
      console.log(error);
    }
  };
  
  addProduct = async (cartId, productId, quantity) => {
    try {
      const productExist = await cartModel.findOne({
        products: { $elemMatch: { product: productId } },
      });

      if (!productExist) {
        const updatedCart = await cartModel.updateOne(
          { _id: cartId },
          { $push: { products: [{ product: productId, quantity }] } }
        );
        return updatedCart;
      }

      const updatedCart = await cartModel.updateOne(
        { _id: cartId },
        { $inc: { "products.$[elem].quantity": quantity } },
        { arrayFilters: [{ "elem.product": productId }] }
      );
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };

  addProducts = async (cartId, products) => {
    try {
      const updatedCart = await cartModel.updateOne(
        { _id: cartId },
        { $set: { products } }
      );
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };

  removeProductById = async (cid, pid) => {
    try {
      const updatedCart = await cartModel.updateOne(
        { _id: cid },
        { $pull: { products: { product: pid } } }
      );
      return updatedCart;

    } catch (error) {
      console.log(error);
    }
  };

  removeProducts = async (cid) => {
    try {
      const cart = await cartModel.updateOne(
        { _id: cid },
        { $set: { products: [] } },
        { multi: true }
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (cid, body) => {
    try {
      const cart = await cartModel.updateOne(
        { _id: cid },
        { $set: { products: body } }
      )
      return cart;
    } catch (error) {
      console.log(error);
    }
  };

  updateProductQuantity = async (cid, pid, cantidad) => {
    try {
      const cart = await cartModel.updateOne(
        {_id: cid},
        { $set: { "products.$[elem].quantity": cantidad } },
        { arrayFilters: [{ "elem.product": pid }] }
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  };
};

