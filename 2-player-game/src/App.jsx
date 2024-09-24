import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home.jsx';
import Game from './components/game/game.jsx';
import './App.css';

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/game' element={<Game />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
