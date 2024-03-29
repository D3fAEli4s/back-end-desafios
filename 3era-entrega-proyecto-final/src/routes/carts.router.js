const { Router } = require('express');
const { getCarts, getCartById, addCart, addToCart, updateCart, updateCartProduct, deleteCart, deleteFromCart, purchase } = require('../controllers/carts.controller');
const { passportAuth } = require('../config/passport.JWT/passport.auth');

const router = Router();


//--------------------GET-----------------------------
router.get('/', getCarts)

router.get('/:cid', getCartById)

//--------------------POST----------------------------

router.post('/', addCart)

router.post('/:cid/product/:pid', addToCart)

router.post('/:cid/purchase',
    passportAuth('jwt', {session: false}),
    purchase)

//----------------PUT-------------------------------

router.put('/:cid', updateCart)

router.put('/:cid/product/:pid', updateCartProduct)

//----------------DELETE-------------------------------

router.delete('/:cid', deleteCart)

router.delete('/:cid/product/:pid', deleteFromCart)

module.exports = router