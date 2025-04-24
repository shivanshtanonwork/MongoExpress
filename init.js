const mongoose = require('mongoose');
const Chat = require("./models/chat")

main()
    .then(() => {
        console.log("Connection successful")
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "Shivansh",
        to: "Vidushi",
        msg: "I love you",
        created_at: new Date()
    },
    {
        from: "Krish",
        to: "Jessica",
        msg: "Aaj badminton chalna hai",
        created_at: new Date()
    },
    {
        from: "Shivansh",
        to: "Krish",
        msg: "Full stack dev finally",
        created_at: new Date()
    },
    {
        from: "Kaalu",
        to: "Jonty",
        msg: "Movie chalo",
        created_at: new Date()
    },
    {
        from: "Shiv",
        to: "Vidu",
        msg: "JS done",
        created_at: new Date()
    },

]

Chat.insertMany(allChats)
