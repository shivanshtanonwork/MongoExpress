const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const Chat = require("./models/chat")
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError")

// Set the directory where the template files are located
app.set("views", path.join(__dirname, "views"));
// Set EJS as the templating engine
app.set("view engine", "ejs")
//serve static files like CSS and JS files
app.use(express.static(path.join(__dirname, "public")))
//to parse data of req.body
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))


main()
    .then(() => {
        console.log("Connection successful")
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}


//Index Route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", { chats })
})

//NEW Route
app.get("/chats/new", (req, res) => {
    throw new ExpressError(404, "Page not found")
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

//Show Route
app.get("/chats/:id", async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id)
    if (!chat) {
        next(new ExpressError(404, "Chat not found"))
    }
    res.render("edit.ejs", { chat })
})

//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params
    let chat = await Chat.findById(id)
    res.render("edit.ejs", { chat })
})

//Update Route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params
    let { msg: newMsg } = req.body
    let upatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true })
    console.log(upatedChat);
    res.redirect("/chats")
})

//Destroy Route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params
    let deletedChat = await Chat.findByIdAndDelete(id)
    console.log(deletedChat)
    res.redirect("/chats")
})

app.get("/", (req, res) => {
    res.send("root is working")
})

// Error Handling Middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Some Error occurred" } = err;
    res.status(status).send(message);
})

app.listen(8080, () => {
    console.log("Server is listening on 8080")
})