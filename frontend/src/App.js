import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import SearchArtists from "./components/SearchArtists";
import Artist from "./components/Artist";
import PlayTrack from "./components/PlayTrack";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="App">
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/artists" element={<SearchArtists />} />
            <Route path="/artist/:id" element={<Artist />} />
            <Route path="/track/:id" element={<PlayTrack />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
