import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://defaaa:Lintendoelias88@basedefa.nl2awb0.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

function runDB(db, coll) {

	const database = client.db(db);
	const collection = database.collection(coll);
	return collection;
}

export {client, runDB};
