import express from "express"
import { MongoClient, ObjectId } from "mongodb";
import { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } from "./config/config.js";
import {helloServer, getJane, getAllDoctors, createDoctor} from "./mongodb/controllers/doctorsController.js"
import { Doctor } from "./mongodb/controllers/Doctor.js";
import {generateRandomString} from "./utils/randomString.js"

const app = express()

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin&retryWrites=true&writeConcern=majority`
const client = new MongoClient(uri);
let testDoctor = new Doctor(generateRandomString(18), "general", generateRandomString(7), 1988)



app.get("/", ()=> helloServer(client).catch(console.dir))
app.get("/doctors", (req, res) => getAllDoctors(client, req, res))
app.post("/testDoctor", (req,res) => createDoctor(client, testDoctor, req,res).catch(console.dir))

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))