import { productRepository } from "../repositories/index.js";
import ProductDTO from "../dao/dtos/product.dto.js";

export default class ProductService {

  constructor() {}
/*
  getProducts = async () => {
    const products = await productRepository.getProducts();
    return products;
  };

  */

  getProducts = async (options) => {
    const products = await productRepository.getProducts(options);
    return products;
  };
  
  createProduct = async (product) => {
    const productToSave = new ProductDTO(product);
    const result = await productRepository.createProduct(productToSave);
    return result;
  };
}