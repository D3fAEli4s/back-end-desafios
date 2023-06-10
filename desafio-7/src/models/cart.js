import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = mongoose.Schema({
  products: [
    {
      _id: false,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;

/*import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  products: [
    {
      _id: false,
      productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
      },
      quantity: {
        type: Number,
        default: 1
      },
    }
  ],
});

cartSchema.pre("findOne", function () {
  this.populate("products.productId");
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;*/

 /*products: [
    {
      productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      },
    },
  ],*/


/* Populate
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  */