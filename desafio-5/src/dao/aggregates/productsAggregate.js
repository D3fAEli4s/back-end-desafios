import productSchema from "../models/ProductSchema.js";

class ProductsAggregate {

	async filters(status,limit, category, sort) {

		let filters = [];

		if(status === "true") {
			filters.push({
				$match: {status: true}
			})
		} else if(status === "false") {
			filters.push({
				$match: {status: false}
			})
		}

		if(!limit) {
			limit = 10;
		}	

		filters.push({
			$limit: Number(limit)
		})

		if(category) {
			filters.push({
				$match: {category: category}
			})
		}

		if(sort) {
			filters.push({
				$sort: {price: Number(sort)}
			})
		}


		return await productSchema.aggregate(filters);
	};

};

export default ProductsAggregate;
