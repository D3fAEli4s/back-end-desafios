//import { contactModel } from "./models/contact.js";
import productsModel from "../models/product.js"

class Product {
  constructor() {}
/*
  getProducts = async () => {
    const product = await productsModel.find();
    return product;
  };
*/
  getProducts = async (options) => {
    try {
      const { query, pagination } = options;
      const paginatedProducts = await productsModel.paginate(query, pagination);
      return paginatedProducts;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  createContact = async (contact) => {
    const createdContact = await productsModel.create(contact);
    return createdContact;
  };
}

export const productMongo = new Product();



/*import productsModel  from "../models/product.js"

export default class Product {
  constructor() {}

  getProducts = async (options) => {
    try {
      const { query, pagination } = options;
      const paginatedProducts = await productsModel.paginate(query, pagination);
      return paginatedProducts;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
  createProduct = async (product) => {
    try {
      const result = await productsModel.create(product);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getProductById = async (id) => {
    try {
      const product = await productsModel.findOne({ _id: id }).lean();
      return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  updateProduct = async (id, changes) => {
    try {
      const updatedProduct = await productsModel.updateOne(
        { _id: id },
        changes
      );
      return updatedProduct;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  deleteProduct = async (id) => {
    try {
      const deletedProduct = await productsModel.deleteOne({ _id: id });
      return deletedProduct;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

}

*/


