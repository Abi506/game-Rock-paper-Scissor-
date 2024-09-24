import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/rock-paper-scissors-logo.png'; // Ensure path is correct
import { FaGamepad } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setPlayer1, setPlayer2 } from '../../slice/slice'; // Ensure the correct path
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

import './home.css';

const Home = () => {
  const audioRef = useRef(null);
  const [isGameStarted, setGameStart] = useState(false); 
  const [data, setData] = useState(null); 

  const dispatch = useDispatch();

  useEffect(() => {
    if (isGameStarted && audioRef.current) {
      audioRef.current.play(); 
    }
  }, [isGameStarted]);

  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/game'); 
      setData(response.data); 
      console.log(response.data); 
    } catch (error) {
      console.error("Error fetching data:", error); 
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const handleGameStart = (e) => {
    e.preventDefault();
    setGameStart(true);
  };

  const handlePlayer1 = (e) => {
    dispatch(setPlayer1(e.target.value)); 
  };

  const handlePlayer2 = (e) => {
    dispatch(setPlayer2(e.target.value)); 
  };

  return (
    <div className="home-container">
      <div className="home-logo-container">
        <img src={logo} className="home-logo" alt="Rock Paper Scissors Logo" />
      </div>
      <h1 className="heading">Rock Paper Scissors</h1>
      <form onSubmit={handleGameStart}>
        <div style={{ textAlign: "center" }}>
          <input
            type="text"
            required
            onChange={handlePlayer1}
            style={{ padding: "10px", borderRadius: "4px" }}
            placeholder="Name of Player-1"
          />
          <br />
          <br />
          <input
            type="text"
            onChange={handlePlayer2}
            required
            style={{ padding: "10px", borderRadius: "4px" }}
            placeholder="Name of Player-2"
          />
        </div>
        <br />
        
        <button className="play-button" type="submit">
          <FaGamepad className="video-game-icon" />
          <span>Play</span>
        </button>
      </form>
      {isGameStarted && <Navigate to="/game" replace />}
      {data && (
      <Table striped bordered hover style={{marginTop:"10px"}}>
      <thead>
        <tr>
          <th>player 1</th>
          <th>player 2</th>
          <th>winner</th>
        </tr>
      </thead>
      <tbody>
        {
            data.map((each)=>(
                <tr>
                    <td>
                    <p>{each.player1.name}</p>
                    <p>score: {each.player1.score}</p>
                    </td>
                    <td>
                        
                    <p>{each.player2.name}</p>
                    <p>score: {each.player2.score}</p>
                    </td>
                    <td><p>{each.winner}</p></td>
                </tr>
            ))
        }
        </tbody>
        </Table>
        )}
    </div>
  );
};

export default Home;
