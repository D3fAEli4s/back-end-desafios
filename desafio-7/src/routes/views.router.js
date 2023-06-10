import { Router } from "express";
import passport from "passport";
import ProductManager from "../controllers/Products.js";
import CartManager from "../controllers/Carts.js";
//import { checkLogged, checkLogin } from "../middlewares/auth.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const options = {
      query: {},
      pagination: {
        limit: req.query.limit ?? 10,
        page: req.query.page ?? 1,
        lean: true,
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

    const link = "/?page=";

    const prevLink = hasPrevPage ? link + prevPage : link + page;
    const nextLink = hasNextPage ? link + nextPage : link + page;

    return res.render("products", {
      products,
      totalPages,
      page,
      hasNextPage,
      hasPrevPage,
      prevLink,
      nextLink,
      title: "Products",
      user: req.user,
    });
  }
);

/*router.get("/", checkLogin, async (req, res) => {
  const options = {
    query: {},
    pagination: {
      limit: req.query.limit ?? 10,
      page: req.query.page ?? 1,
      lean: true,
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

  const link = "/?page=";
  const prevLink = hasPrevPage ? link + prevPage : link + page;
  const nextLink = hasNextPage ? link + nextPage : link + page;

  let userRole = null;
  if (req.user.role === "admin") {
    userRole = req.user.role;
  }
  
  return res.render("products", {
    products,
    totalPages,
    page,
    hasNextPage,
    hasPrevPage,
    prevLink,
    nextLink,
    title: "Products",
    user: req.user,
    userRole,
  });
});
*/

router.get("/product/:pid", async (req, res) => {
  const productId = req.params.pid;
  const product= await productManager.getProductById(productId);
  res.render("product",{product});
});

router.get("/cart", async (req, res) => {
  const cart = await cartManager.getCartById('644ecacbab65062ae039e447');
  return res.render("cart", {products: cart.products});
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.render("profile", { user: req.user });
});


/*router.get("/login", checkLogged, async (req, res) => {
  res.render("login");
});

router.get("/register", checkLogged, async (req, res) => {
  res.render("register");
});

router.get('/logout', async (req, res)=>{
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  });
});*/

export default router;