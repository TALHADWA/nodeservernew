const express = require("express");
const mongoose = require("mongoose");
const schema = require("./schma"); // Ensure correct file name
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

app.get("/getbyid/:id", async function (req, res) {
    try {
        try {
            const data = await schema.find({id: req.params.id});
            res.send(data);
        } catch (err) {
            res.status(500).send({ error: "Error fetching data" });
        }
    } catch (err) {
        console.error("Error Saving Data:", err); // Log error message
        res.status(500).send({ error: "Error saving data", details: err.message });
    }
});
app.post('/profile', upload.single('file'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })
// Define routes
app.get("/getdata", async function (req, res) {
    try {
        const data = await schema.find();
        res.send(data);
    } catch (err) {
        res.status(500).send({ error: "Error fetching data" });
    }
});



app.post("/deletebyid/:id", async function (req, res) {
    try {
        const data = await schema.deleteOne({id:req.params.id});
        res.send(data);
    } catch (err) {
        res.status(500).send({ error: "Error fetching data" });
    }
});



app.post("/postdata", async function (req, res) {
    try {
        console.log("Incoming Data:", req.body); // Log incoming request data

        const bn = new schema({
            id: req.body.id,
            userid: req.body.userid,
            title: req.body.title,
            body: req.body.body,
        });

        const data = await bn.save();
        console.log("Data Saved Successfully:", data); // Log saved data

        res.status(201).send(data);
    } catch (err) {
        console.error("Error Saving Data:", err); // Log error message
        res.status(500).send({ error: "Error saving data", details: err.message });
    }
});








// Connect to MongoDB and Start the Server
mongoose
    .connect("mongodb+srv://talhaali21cv:tyCnq4g7drn1PZzH@cluster0.jsmg5yb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
    });
