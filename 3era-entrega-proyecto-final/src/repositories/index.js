// CREAR UNA CLASE A PARTIR DE UN MODELO D EPERSISTENCIA

import { productDAO } from "../dao/factory.js";
import ProductRepository from "./product.repository.js";

export const productRepository = new ProductRepository(productDAO);