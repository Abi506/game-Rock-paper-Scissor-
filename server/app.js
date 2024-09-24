const express = require("express");
const app = express();
const connectMongo = require("./connections");
const cors = require('cors');

// Connect to MongoDB
connectMongo("mongodb+srv://abinandhan:hqzzdU3vLepl8gY8@cluster0.2x76hsn.mongodb.net/rock-paper-scissor");

// Middleware
app.use(cors());
app.use(express.json());

// Importing the Game model
const GameData = require("./model/game");

// Routes
app.post("/game", async (req, res) => {
    const { winner, player1Data, player2Data } = req.body;
    console.log(winner,"winner")
    console.log(player1Data,"player1Data")
    console.log(player2Data,'player2Data')
    try {
        const responseDb = await GameData.create({
            winner,
            player1: {
                name: player1Data.name,
                score: player1Data.score,
            },
            player2: {
                name: player2Data.name,
                score: player2Data.score,
            },
        });
        console.log(responseDb, 'response from database');
        res.status(201).send(responseDb); // Send created resource with 201 status
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" }); // Generic error message
    }
});

app.get("/game", async (req, res) => {
    try {
        const responseDb = await GameData.find({});
        console.log(responseDb, 'response from db');
        res.status(200).send(responseDb); // Send data with 200 status
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" }); // Generic error message
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on localhost:3000");
});
