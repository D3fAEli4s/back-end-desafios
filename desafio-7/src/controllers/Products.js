import productModel from "../models/product.js"

export default class ProductManager {

  constructor() {}

  getProducts = async () => {
    try {
      const products = await productModel.find().lean();
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  getPaginatedProducts = async (options) => {
    try {
      const { query, pagination } = options;
      const paginatedProducts = await productModel.paginate(query, pagination);
      return paginatedProducts;
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (id) => {
    try {
      const products = await productModel.findById(id).lean();
      return products;
    } catch (error) {
        console.log(error);
    }
  };
 
  createProduct = async (product) => {
    try {
      const productCreated = await productModel.create(product);
      return productCreated;
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (id, updatedFields) => {
    try {
      const updatedproductt = await productModel.findByIdAndUpdate(id, updatedFields, { useFindAndModify: false })
      return updatedproductt;
    } catch (error) {
      console.log(error);
    }
}

deleteProduct = async (id) => {
  try {
    let deletedProduct = await productModel.findByIdAndDelete({ _id: id });
    return deletedProduct;
  } 
  catch (error) {
    console.log(error);
  }
};

}