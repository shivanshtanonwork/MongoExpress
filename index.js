const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const Chat = require("./models/chat")

// Set the directory where the template files are located
app.set("views", path.join(__dirname, "views"));
// Set EJS as the templating engine
app.set("view engine", "ejs")


main()
    .then(() => {
        console.log("Connection successful")
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/", (req, res) => {
    res.send("root is working")
})

app.listen(8080, () => {
    console.log("Server is listening on 8080")
})