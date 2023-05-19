import fs from "fs/promises";

class CartsManager {

	#autoId;
	#carts;

	constructor() {
		this.cartsPath = "./src/bd/Carts.json"
		this.encoding = {encoding: "utf-8"}
		this.#autoId = 0
		this.#carts = []
	}

	async loadCartsData() {

		try
		{
			this.#carts = await this.getCarts();
			if(this.#carts.length > 0){
				return this.#autoId = this.#carts.at(-1).id;
			}
		}catch(err) {
			return err;
		}

	};

	async fsWrite (array) {

		try
		{	
			await fs.writeFile(this.cartsPath, JSON.stringify(array)); 
		}
		catch(err){
			return err;
		}

	};

	async addCart() {

		try
		{

			await this.loadCartsData();

			const newCart = {
				id: ++this.#autoId,
				products: []
			};

			this.#carts.push(newCart);

			// Le doy permanencia a los cambios realizados
			await this.fsWrite(this.#carts); 

			return newCart;

		}catch(err) {

			throw err;

		};

	};

	async addProductToCart(cartId, product) {

		try{
		await this.loadCartsData();
		}catch(err) {
			return err;
		}

		const indexCart = this.#carts.findIndex(cart => cart.id === cartId);	

		const foundCart = this.#carts[indexCart];
		console.log(indexCart)

		if(indexCart >= 0) {

			const newProduct = {id: product.id, quantity: 1};
			const indexProductInCart = foundCart.products.findIndex(product => product.id === newProduct.id);

			if(indexProductInCart < 0) {
				foundCart.products.push(newProduct);
			}else{
					foundCart.products[indexProductInCart].quantity++;
			}

			try
			{
				await this.fsWrite(this.#carts); 
				return {cartId: cartId, productId: newProduct.id, quantity: newProduct.quantity};

			}catch(err) {
				return err;
			}

		}
		throw "Error: Cart not found";


	};
	async getCarts() {
		try
		{
			return JSON.parse(await fs.readFile(this.cartsPath,this.encoding));
		}
		catch (err)
		{
			await this.fsWrite([]); 

			return [];
		}
	};

	async getCartById(id) {

		try
		{
			await this.loadCartsData();

			const foundCart = this.#carts.find(cart => cart.id === id );

			if(foundCart) {
				return foundCart.products;
			}
		}catch(err) {
			throw err;
		}

		throw( `The cart with ID ${id} was not found in the database`);

	};

	async deleteProductToCart(cartId, productId) {

		try{

			await this.loadCartsData();
			const foundIndexCart = this.#carts.findIndex(cart => cart.id === cartId );
			const foundCart = this.#carts[foundIndexCart];
			const foundProductInCart = foundCart.products.find(product => product.id === productId);

			if(foundIndexCart >= 0 && foundProductInCart) {

				const newProducts = foundCart.products.filter(products => products.id !== productId);
				this.#carts[foundIndexCart].products = newProducts;

				await this.fsWrite(this.#carts); 

				return `The product with ID ${foundProductInCart.id} was successfully deleted`
			}

			throw ( `Cart or Product was not found in the database and cannot be deleted` );

		}
		catch(err)
		{
			throw err;
		}
	}
}

export default CartsManager;
