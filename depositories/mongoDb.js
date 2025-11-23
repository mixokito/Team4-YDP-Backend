import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://Mokito:mk27112551@mokito.fhrcf5f.mongodb.net/?appName=Mokito";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function getUsers() {
    try {
        await client.connect();
        const database = client.db('Moki');
        const users = database.collection('Users');
        const results = await users.find({}).toArray();
        return results;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    } finally {
        await client.close();
    }
}

async function createUsers(name, age, likes) {
    try {
        await client.connect();
        const database = client.db('Moki')
        const users = database.collection('Users')
        const result = await users.insertOne({ "name": name, "age": age, "likes": likes });
        return result;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

async function deleteUsers(userId) {
    try {
        await client.connect();
        const database = client.db('Moki')
        const users = database.collection('Users')
        const result = await users.deleteOne({ "name": userId });
        return result;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}


export { getUsers, createUsers, deleteUsers };

run().catch(console.dir);
