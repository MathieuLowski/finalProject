const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const multer = require("multer");
const nodemailer = require("nodemailer");

const {
  handleHome,
  handleNewGuide,
  handleLogin,
  handleTourForm,
  handlePersonalInfo,
  handleUserTours,
  handleHomeFeed,
  handleSearch,
  handleDeleteTour,
  handleSignup,
  handleBooking,
  handleTourInfo,
  handleUpload,
  handleGuides,
} = require("./handlers");

const PORT = 5678;

const { MongoClient } = require("mongodb");
//const { TourContext } = require("../client/src/components/TourContext");
require("dotenv").config();
const { MONGO_URI } = process.env;

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

const upload = multer();

const handleEmail = (req, res) => {
  console.log("emailCOntente", req.body);
  const { subject, mailContent, user1, user2 } = req.body;

  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.UNAME,
      pass: process.env.PASSWORD,
    },
  });

  const message = {
    from: user1,
    to: user2,
    subject: subject,
    text: mailContent,
  };
  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
      res
        .status(200)
        .json({ status: 200, message: "Message succesfully sent." });
    }
  });
};
const server = app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

//ENDPOINTS
app.get("/home", handleHome);
app.get("/searchBar", handleSearch);
app.post("/signupform", handleSignup);
app.post("/login", handleLogin);
app.post("/tourform", handleTourForm);
app.post("/personalinfo/:_id", handlePersonalInfo);
app.post("/manageUserTours", handleUserTours);
app.get("/homePageFeed", handleHomeFeed);
app.delete("/deleteTour/:_id", handleDeleteTour);
app.post("/bookTour", handleBooking);
app.get("/getTourInfo/:_id", handleTourInfo);
app.post("/upload", upload.single("file"), handleUpload);
app.get("/guide/:id", handleGuides);
app.post("/emailForm", handleEmail);

////////PICTURE HANDLER////////
//app.post("/uploadProfilePic", handleProfilePic);

//////// MAIL HANDLER////////

// app.post('',()=>{
//   //find the tour using _id from the params
//   //Then u will have a tour object
//   const participants = [{},{}]
//   tour.participants.map((participantId)=>{
//     const participant = find({_id:participantsId})
//     participants.push(participant)
//   })
// })
