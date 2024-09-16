import bcrypt from 'bcrypt'

// prueba conexión
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

// get with query
export async function getJane(client) {
    try {
        const database = client.db('doctorsapp');
        const movies = database.collection('doctors');
        const query = { name: { $regex: /jane/i } };
        const movie = await movies.findOne(query);
        console.log(movie);
    } finally {
        await client.close();
    }
}

// create generic doctor
export async function createDoctor(client, testDoctor, req, res) {
    try {
        await client.connect();
        const database = client.db("doctorsapp");
        const doctors = database.collection("doctors");

        // Create a document to insert
        testDoctor.password = await bcrypt.hash(testDoctor.password, 12)

        if (req.data == '') {
            console.log("no data found", res);
        }
        const result = await doctors.insertOne(testDoctor);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.send(result.insertedId).status(200)
    } catch (err) {
        res.status(400).json({
            status: "failed create doctor"
        })
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

export async function getAllDoctors(client, req, res) {
    try {
        await client.connect();
        const doctors = await client.db("doctorsapp").collection("doctors").find({}).limit(10).toArray()
        console.log(doctors)
        res.send(doctors).status(200)
    } catch (err) {
        res.status(400).json({
            status: "failed get doctors"
        })
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

// login validation email and pass
export async function login(req, res, client) {

    console.log("New request:", req.method, req.url);
    console.log("Request params:", req.query);

    if (!req || typeof req !== 'object') {
        return res.status(400).json({
            status: "failed",
            message: "Invalid request body"
        });
    }

    const { email, password } = req.query

    if (!email || !password) {
        return res.status(400).json({
            status: "failed",
            message: "Email and password are required"
        });
    }

    try {


        await client.connect();
        const database = client.db("doctorsapp");
        const doctors = database.collection("doctors");

        const query = { email: email };
        const doctor = await doctors.findOne(query);

        if (!doctor) {
            return res.status(404).json({
                status: "failed",
                message: "Doctor not found"
            });
        }

        const passwordVerification = await bcrypt.compare(password, doctor.password)

        if (passwordVerification) {
           return res.status(200).json({
                status: "success",
                data: doctor
            });
            console.log("login doctor", doctor.email)
        }


        return res.status(404).json({
            status: "failed",
            message: "Bad password"
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({
            status: "failed",
            message: "Internal server error"
        });
    } finally {
        await client.close();
    }
}


