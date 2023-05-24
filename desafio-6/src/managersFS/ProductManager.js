import fs from "fs/promises";

class ProductManager {

	#autoId;
	#products;

	constructor() {
		this.path = "./src/bd/Products.json"
		this.encoding = {encoding: "utf-8"}
		this.#autoId = 0
		this.#products = []
	}

	async loadData() {

		try{
			this.#products = await this.getProducts();
		}catch(err) {
			return err;
		}

		if(this.#products.length > 0){
			return this.#autoId = this.#products.at(-1).id;
		};

	};

	async fsWrite (array) {

		try{	
			await fs.writeFile(this.path, JSON.stringify(array)); 
		}
		catch(err){
			return err;
		}

	};

	async addProduct({title, description, category, price, thumbnail, code, stock}) {

		try
		{
			await this.loadData();
		}catch(err){
			return err;
		}
		
		const duplicateCode = this.#products.some(product => product.code === code);

		if(typeof title === "string" && typeof description === "string" && typeof category === "string" && typeof price === "number" && typeof code === "string" && typeof stock === "number" && !duplicateCode ) {

			const newProduct = {
				id: ++this.#autoId,
				title,
				description,
				category,
				price,
				thumbnail,
				code,
				stock,
				status: true,

			};

			this.#products.push(newProduct);

			try
			{
				await this.fsWrite(this.#products);
			}catch(err) {
				return err;
			}

			return newProduct;
		}
		
		throw "Incorrectly enterer data or empty fields (addProduct)";

	};

	async getProducts() {
		
		try
		{
			return JSON.parse(await fs.readFile(this.path,this.encoding));
		}
		catch (err)
		{
			await this.fsWrite([]); 
			return [];
		}

	};

	async getProductById(id) {

		try
		{		
			await this.loadData();
		}catch(err){
			return err;
		}
		
		const foundProduct = this.#products.find(product => product.id === id );

		if(foundProduct) {

			return foundProduct;

		}
		
		throw `The product with ID ${id} was not found in the database`;

	};

	async updateProduct(id, data) {

		try
		{
			await this.loadData();
		}
		catch(err)
		{
			return err;
		}
		
		const index = this.#products.findIndex(product => product.id === id);
		
		const duplicateCode = this.#products.some(product => product.code === data.code);
		
		const otherId = data.id !== undefined && id !== data.id;

		if(index >= 0 && !duplicateCode && !otherId ) {
				
			try{
				this.#products[index] = {...this.#products[index], ...data};

				await this.fsWrite(this.#products); 
				return this.#products[index];
			}catch(err){
				return err;
			}

		}else if(index < 0) {

			throw `The product with ID ${id} was not found in the database`;

		}else if(duplicateCode) {

			throw `The product with code ${data.code} has already been created`;

		}else if(otherId) {

			throw 'Operation not allowed: ID field, cannot be modified';

		}

	};

	async deleteProduct(id) {

		try
		{
			await this.loadData();
		}catch(err){
			return err;
		}
		
		const foundProduct = this.#products.find(product => product.id === id );

		if(foundProduct) {

			this.#products = this.#products.filter(products => products.id !== id);

			try
			{
				await this.fsWrite(this.#products); 

				return `Product ${foundProduct.title} with ID ${foundProduct.id} was successfully deleted`
			}
			catch(err)
			{
				return err;
			}

		};
		
		throw `The product with ID ${id} was not found in the database and cannot be deleted`

	};

}

export default ProductManager;
