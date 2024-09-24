import { useState, useEffect } from 'react';
import { FaHandBackFist } from "react-icons/fa6";
import { FaRegHandBackFist } from "react-icons/fa6";
// Rock
import { FaHandRock } from "react-icons/fa";
import { FaRegHandRock } from "react-icons/fa";
// Hand
import { FaHandPaper } from "react-icons/fa";
import { FaRegHandPaper } from "react-icons/fa";
// Scissor
import { FaHandScissors } from "react-icons/fa";
import { FaRegHandScissors } from "react-icons/fa";

import { useSelector } from 'react-redux';

// Images
import scissor from '../../assets/scissor-removebg-preview.png';
import rock from '../../assets/rock-removebg-preview.png';
import paper from "../../assets/paper-removebg-preview.png";

import axios from 'axios'

import './game.css';
import { Navigate } from 'react-router-dom';

const Game = () => {
    const [playerScore, setPlayerScore] = useState({ player1: 0, player2: 0 });
    const [rounds, setRounds] = useState(1);
    const [player1Choice, setPlayer1Choice] = useState({ choice: "", imageSrc: "" });
    const [player2Choice, setPlayer2Choice] = useState({ choice: "", imageSrc: "" });
    const [turnWinner, setTurnWinner] = useState("");
    const [finalWinner, setFinalWinner] = useState("");

    const player1 = useSelector((state) => state.usersInfo.player1Name);
    const player2 = useSelector((state) => state.usersInfo.player2Name);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const word = e.key.toUpperCase();
            
            // Only proceed if both players haven't made their choices yet
            if (!player1Choice.choice || !player2Choice.choice) {
                switch (word) {
                    case "A":
                        setPlayer1Choice({ choice: "rock", imageSrc: rock });
                        break;
                    case "S":
                        setPlayer1Choice({ choice: "paper", imageSrc: paper });
                        break;
                    case "D":
                        setPlayer1Choice({ choice: "scissors", imageSrc: scissor });
                        break;
                    case "J":
                        setPlayer2Choice({ choice: "rock", imageSrc: rock });
                        break;
                    case "K":
                        setPlayer2Choice({ choice: "paper", imageSrc: paper });
                        break;
                    case "L":
                        setPlayer2Choice({ choice: "scissors", imageSrc: scissor });
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [player1Choice, player2Choice]);

    // Handle logic to decide the winner after both players have chosen
    useEffect(() => {
        if (player1Choice.choice && player2Choice.choice) {
            if (player1Choice.choice === player2Choice.choice) {
                setTurnWinner("It's a Tie");
            } else if (
                (player1Choice.choice === "rock" && player2Choice.choice === "scissors") ||
                (player1Choice.choice === "scissors" && player2Choice.choice === "paper") ||
                (player1Choice.choice === "paper" && player2Choice.choice === "rock")
            ) {
                setTurnWinner(`${player1} wins`);
                setPlayerScore((prevScore) => ({ ...prevScore, player1: prevScore.player1 + 1 }));
            } else {
                setTurnWinner(`${player2} wins`);
                setPlayerScore((prevScore) => ({ ...prevScore, player2: prevScore.player2 + 1 }));
            }
        }
    }, [player1Choice, player2Choice]);

    // Calculate the final winner when rounds reach 6
    useEffect(() => {
        if (rounds === 6) {
            if (playerScore.player1 > playerScore.player2) {
                setFinalWinner(`${player1} wins the game!`);
            } else if (playerScore.player1 < playerScore.player2) {
                setFinalWinner(`${player2} wins the game!`);
            } else {
                setFinalWinner("It's a tie!");
            }
        }
    }, [rounds, playerScore]);

    const handleNextRound = () => {
        setRounds((prev) => prev + 1);
        // Reset choices for the next turn
        setTurnWinner("");
        setPlayer1Choice({ choice: "", imageSrc: "" });
        setPlayer2Choice({ choice: "", imageSrc: "" });
    };




    const handleUploadScores = async () => {
        try {
            const winner = finalWinner;
            const player1Data = {
                name: player1,
                score: playerScore.player1
            };
            const player2Data = {
                name: player2,
                score: playerScore.player2
            };
            const data = { winner, player1Data: player1Data, player2Data: player2Data };
            console.log(data, 'data');
            
            const url = "http://localhost:3000/game";
            const response = await axios.post(url, data); // Fixed syntax error here
            console.log(response.data); // Log the response data
            Navigate('/')
        } catch (error) {
            console.error("Error uploading scores:", error); // Log the error if the request fails
        }
    };

    return (
        <div className='game-container'>
            {rounds < 6 ? (
                <>
                    <p>Round {rounds}</p>
                    <div className='score-container'>
                        <div>
                            <p>{player1}</p><p>{playerScore.player1}</p>
                        </div>
                        <div>
                            <p>{player2}</p><p>{playerScore.player2}</p>
                        </div>
                    </div>

                    {/* Players turns show here */}
                    <div>
                        {player1Choice.choice === "" && (
                            <h1 className='player-turn-text'>{player1} turn</h1>
                        )}
                        {
                            player1Choice.choice !== "" && player2Choice.choice === "" && (
                                <h1 className='player-turn-text'>{player2} turn</h1>
                            )
                        }
                        {
                            turnWinner !== "" && (
                                <h1>{turnWinner}</h1>
                            )
                        }
                    </div>

                    {/* Image container */}
                    <div className='hand-image-container'>
                        {turnWinner === "" ? (
                            <>
                                <div>
                                    <FaHandBackFist className='left-hand-image' />
                                </div>
                                <div>
                                    <FaRegHandBackFist className='right-hand-image' />
                                </div>
                            </>
                        ) : (
                            <div className='result-image-container'>
                                <div>
                                    <img src={player1Choice.imageSrc} alt={player1Choice.choice} className='result-image' />
                                </div>
                                <div>
                                    <img src={player2Choice.imageSrc} alt={player2Choice.choice} className='result-image' />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Player choice container */}
                    <div className='players-containers'>
                        <div className='player-1-container'>
                            <h1>{player1}</h1>
                            <div className='player-1-icons-container'>
                                <p className='rock-player-1'>
                                    <p className='common-containers-of-icons'>
                                        <FaHandRock className='common-player-icon' />
                                        <p className='icons-text'>Rock</p>
                                    </p>
                                    <span>A</span>
                                </p>

                                <p className='paper-player-1'>
                                    <p className='common-containers-of-icons'>
                                        <FaHandPaper className='common-player-icon' />
                                        <p className='icons-text'>Paper</p>
                                    </p>
                                    <span>S</span>
                                </p>
                                <p className='scissor-player-1'>
                                    <p className='common-containers-of-icons'>
                                        <FaHandScissors className='common-player-icon' />
                                        <p className='icons-text'>Scissors</p>
                                    </p>
                                    <span>D</span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <h1>{player2}</h1>
                            <div className='player-2-icons-container'>
                                <p className='rock-player-2'>
                                    <p className='common-containers-of-icons'>
                                        <FaRegHandRock className='common-player-icon' />
                                        <p className='icons-text'>Rock</p>
                                    </p>
                                    <span>J</span>
                                </p>
                                <p className='paper-player-2'>
                                    <p className='common-containers-of-icons'>
                                        <FaRegHandPaper className='common-player-icon' />
                                        <p className='icons-text'>Paper</p>
                                    </p>
                                    <span>K</span>
                                </p>
                                <p className='scissor-player-2'>
                                    <p className='common-containers-of-icons'>
                                        <FaRegHandScissors className='common-player-icon' />
                                        <p className='icons-text'>Scissors</p>
                                    </p>
                                    <span>L</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {player1Choice.choice && player2Choice.choice && (
                        <button className='next-round-btn' onClick={handleNextRound}>
                            Next Round
                        </button>
                    )}
                </>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <p style={{ marginTop: "10px" }}>Winner of the game is</p>
                    <h1 style={{ color: "green" }}>{finalWinner}</h1>
                    <a href="/"><button onClick={handleUploadScores}>Upload Score</button></a>
                </div>
            )}
        </div>
    );
};

export default Game;
