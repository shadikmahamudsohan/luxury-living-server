const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();


//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9p5xs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log('connected to mongodb');

        const houseCollection = client.db("houses").collection("house");

        // get all data from database
        app.get('/', async (req, res) => {
            const housers = await houseCollection.find({}).toArray();
            res.send(housers);
        });
        // get all data from database
        app.get('/houses', async (req, res) => {
            const housers = await houseCollection.find({}).toArray();
            res.send(housers);
        });

        // get single data from database
        app.get('/houses/:id', async (req, res) => {
            const id = req.params.id;
            const find = { _id: ObjectId(id) };
            const singleHouse = await houseCollection.findOne(find);
            res.send(singleHouse);
        });

        // filter house
        app.get('/filter-houses', async (req, res) => {
            const data = req.body;
            const filtered = await houseCollection.find(data).toArray;
            res.send(filtered);
        });


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

//middleware
app.use(cors());
app.use(express.json());