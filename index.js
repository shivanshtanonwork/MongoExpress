const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const Chat = require("./models/chat")

// Set the directory where the template files are located
app.set("views", path.join(__dirname, "views"));
// Set EJS as the templating engine
app.set("view engine", "ejs")
//serve static files like CSS and JS files
app.use(express.static(path.join(__dirname, "public")))
//to parse data of req.body
app.use(express.urlencoded({ extended: true }))


main()
    .then(() => {
        console.log("Connection successful")
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index Route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", { chats })
})

//NEW Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs")
})

//Create Route
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    })
    newChat.save()
        .then((res) => {
            console.log("Chat was saved")
        }).catch((err) => {
            console.log(err)
        })
    res.redirect("/chats")
})

app.get("/", (req, res) => {
    res.send("root is working")
})

app.listen(8080, () => {
    console.log("Server is listening on 8080")
})