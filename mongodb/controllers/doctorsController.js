export async function helloServer(client) {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

export async function getJane(client) {
    try {
        const database = client.db('doctorsapp');
        const movies = database.collection('doctors');
        // Query for a movie that has the title 'Back to the Future'
        const query = { name: { $regex: /jane/i } };
        const movie = await movies.findOne(query);
        console.log(movie);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

export async function createDoctor(client, testDoctor, req, res) {
    try {
        // Connect to the "doctorsapp" database and access its "doctores" collection
        const database = client.db("doctorsapp");
        const doctors = database.collection("doctors");

        // Create a document to insert
        const doc = testDoctor

        if (req.data == '') {
            console.log("no data found", res);
        }
        const result = await doctors.insertOne(doc);
        // Print the ID of the inserted document
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.send(result.insertedId).status(200)
    } catch(err){
        console.log(err.stack);
    }
}

export async function getAllDoctors(client, req, res) {
    const doctors = await client.db("doctorsapp").collection("doctors").find({}).limit(10).toArray()
    console.log(doctors)
    res.send(doctors).status(200)
}



