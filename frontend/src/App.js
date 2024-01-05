import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Artists from "./components/Artists";
import Artist from "./components/Artist";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="App">
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artist/:id" element={<Artist />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
