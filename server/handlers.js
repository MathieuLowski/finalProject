const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleHome = (req, res) => {
  console.log("zzz");
  res.status(200).json({ satus: 200 });
};

const handleNewGuide = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("FinalProject");

    await db.collection("guides").insertOne(req.body);
    res.status(201).json({ status: 201, message: req.body });

    client.close();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { handleHome, handleNewGuide };
