//dto
//factory cntactDAO
//import { productDAO } from "../dao/factory";

export default class ProductRepository {
  
    constructor(dao) {
      this.dao = dao;
    }

    getProducts = async (options) => {
      const products = await this.dao.getProducts(options);
      return products;
    };
    
    createProduct = async (product) => {
      const createdProduct = await this.dao.createProduct(product);
      return createdProduct;
    };
}