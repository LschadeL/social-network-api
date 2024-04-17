const connection = require("../config/connection");
const { User } = require("../models");
const { Thought } = require("../models/Thought");

connection.on("error", (err) => err);

connection.once("open", async () => {
    let thoughtCheck = await connection.db.listCollections({ name: "thoughts" }).toArray();

    if (thoughtCheck.length) {
        await connection.dropCollection("thoughts");
    }

    let usersCheck = await connection.db.listCollections({ name: "users" }).toArray();
    
    if (usersCheck.length) {
        await connection.dropCollection("users");
    }

    const users = [
        { userName: "Lillith", email: "sorinschadeloi@gmail.com" },
        { userName: "Nathan", email: "nathan99@gmail.com" },
        { userName: "Barry", email: "Barry46@gmail.com"}
    ];

    const userData = await User.insertMany(users);

    process.exit(0);
});