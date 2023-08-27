import { MongoClient } from "mongodb";


const connectionString = "mongodb+srv://mohit:august2023@clusterforliveinventory.k05wlli.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let db;

try {
    await client.connect();
    db = client.db("nodes");
    console.log("Connected to MongoDB Atlas");
} catch (e) {
    console.error("Error connecting to MongoDB Atlas:", e);
}

export default db;