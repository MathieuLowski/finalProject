const { MongoClient, ObjectID } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleHome = (req, res) => {
  console.log("zzz");
  res.status(200).json({ satus: 200 });
};

const handleHomeFeed = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("FinalProject");
    const dbFeeed = await db.collection("tours").find().toArray();
    res.status(201).json({ status: 201, dbFeeed });
    client.close();
  } catch (err) {}
};

const handleSignup = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    console.log("connected");
    const db = client.db("FinalProject");

    await db.collection("users").insertOne(req.body);
    res.status(201).json({ status: 201, userInfo: req.body });

    client.close();
  } catch (err) {
    console.log(err.message);
  }
};

const handleLogin = async (req, res) => {
  const email = req.body.email;
  //console.log("email", email);
  const client = await MongoClient(MONGO_URI, options);
  //console.log("ttt", req.body.email);
  try {
    await client.connect();

    const db = client.db("FinalProject");
    //Find the document of the user trying to signin
    const dbResult = await db
      .collection("users")
      .findOne({ mail: req.body.email });
    //Then check if u actually get a document back
    //console.log("aa", dbResult);
    //If did then it's ok to send back a positive response with the user info from the
    const { _id, name, lastName, mail, city, imgUrl } = dbResult;
    //const extraData = await db.collection("users").find()
    const userInfo = dbResult;
    if (dbResult !== null) {
      return res.status(201).json({ status: 201, userInfo });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "User can't be found" });
    }

    //else send some of kind error message so you can tell user to try again

    //
    client.close();
  } catch (err) {
    console.log(err.message);
  }
};

handleTourForm = async (req, res) => {
  console.log(req.body);
  const client = await MongoClient(MONGO_URI, options);
  const {
    city,
    tourTitle,
    tourDescription,
    foodAndDrinks,
    cityEscape,
    urbanExplo,
    historical,
    shopping,
    entertainment,
    userId,
    price,
    participantsArray,
    imgUrl,
  } = req.body;
  const guideId = ObjectID(userId);

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("FinalProject");
    console.log("db", db);
    const dbResult = await db.collection("tours").insertOne({
      tourTitle,
      city,
      tourDescription,
      foodAndDrinks,
      cityEscape,
      urbanExplo,
      historical,
      shopping,
      entertainment,
      guideId,
      price,
      participantsArray,
      imgUrl,
    });
    res.status(201).json({ status: 201, message: dbResult });
    client.close();
  } catch (err) {
    return res
      .status(404)
      .json({ status: 404, message: "There is some friction somewhere" });
  }
};

const handleDeleteTour = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const _id = req.params._id;
  console.log(_id);
  try {
    await client.connect();

    const db = client.db("FinalProject");

    const dbResult = await db
      .collection("tours")
      .deleteOne({ _id: ObjectID(_id) });
    assert.equal(1, dbResult.deletedCount);
    res.status(200).json({ status: 200, message: "Tour Deleted" });
    client.close();
  } catch (err) {
    console.log(err.message);
    return res
      .status(404)
      .json({ status: 404, message: "There is some friction somewhere" });
  }
};

// update({ _id: tourID }, { $push: { participants: ObjectID(userid) } });
// .find({ _id: ObjectID(_id) })
const handleTourInfo = async (req, res) => {
  console.log("params", req.params);
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("FinalProject");
    const dbResult = await db
      .collection("tours")
      .findOne({ _id: ObjectID(req.params._id) });
    console.log("tourInfo", dbResult);
    res.status(200).json({ status: 200, message: dbResult });
  } catch (err) {
    console.log(err.message);
    return res
      .status(404)
      .json({ status: 404, message: "There is some friction somewhere" });
  }
};

const handleBooking = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  console.log("body", req.body);
  const { _id, userId } = req.body;
  try {
    await client.connect();
    const db = client.db("FinalProject");
    const dbResult = await db
      .collection("tours")
      .update(
        { _id: ObjectID(_id) },
        { $push: { participantsArray: ObjectID(userId) } }
      );
    console.log(dbResult);
    res.status(201).json({ status: 201, message: dbResult });
    client.close();
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({ status: 404, message: err.message });
  }
};

const handleUserTours = async (req, res) => {
  console.log("body", req.body);
  console.log("params", req.params);
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("FinalProject");

    const dbResult = await db
      .collection("tours")
      .find({ guideId: ObjectID(req.body.userId) })
      .toArray();
    console.log(dbResult);
    res.status(201).json({ status: 201, dbResult });
    client.close();
  } catch (err) {
    console.log(err.message);
    console.log(err.stack);
    return res
      .status(404)
      .json({ status: 404, message: "There is some friction somewhere" });
  }
};

const handleSearch = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("FinalProject");

    const dbResult = await db.collection("tours").find().toArray();
    res.status(201).json({ status: 201, dbResult });
    client.close();
  } catch (err) {
    res.status(404).json({ satus: 404, message: "Data interruption" });
  }
};

const handlePersonalInfo = async (req, res) => {
  const persInfo = req.body;
  console.log("withpic", req.body);
  const { name, lastName, city, mail, bio, lang, imgUrl } = req.body;

  console.log("id", req.params._id);
  const _id = req.params._id;
  console.log(req.params);
  console.log("new stuff", persInfo);

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("FinalProject");

    const dbResult = await db
      .collection("users")
      .updateOne(
        { _id: ObjectID(_id) },
        { $set: { name, lastName, city, mail, bio, lang, imgUrl } }
      );
    console.log("dbResults", dbResult.body);
    const responseObject = await db.collection("users").find({ _id }).toArray();
    res.status(201).json({
      status: 201,
      userInfo: { name, lastName, city, mail, bio, lang, _id },
    });
    client.close();
  } catch (err) {
    console.log(err.message);
    return res
      .status(404)
      .json({ status: 404, message: "There is some friction up in here" });
  }
};

const handleUpload = (req, res) => {
  console.log("body", req.body);
  console.log("file", req.file);
  const {
    file,
    body: { name },
  } = req;
};

const handleGuides = async (req, res) => {
  console.log("proff", req.params);
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("FinalProject");

    const dbResult = await db
      .collection("users")
      .findOne({ _id: ObjectID(req.params.id) });
    console.log("Eine Result", dbResult);
    res.status(200).json({ status: 200, message: dbResult });
  } catch (err) {
    console.log(err.message);
    return res
      .status(404)
      .json({ status: 404, message: "There is some friction up in here" });
  }
};

module.exports = {
  handleHome,
  handleSignup,
  handleLogin,
  handleTourForm,
  handlePersonalInfo,
  handleUserTours,
  handleHomeFeed,
  handleSearch,
  handleDeleteTour,
  handleBooking,
  handleTourInfo,
  handleUpload,
  handleGuides,
};
