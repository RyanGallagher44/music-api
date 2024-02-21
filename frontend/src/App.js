import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import SearchArtists from "./components/SearchArtists";
import Artist from "./components/Artist";
import Album from "./components/Album";
import Playlist from "./components/Playlist"
import Playlists from "./components/Playlists"


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
            <Route path="/album/:id" element={<Album />} />
            <Route path="/playlist/:name" element={<Playlist />} />
            <Route path="/playlists" element={<Playlists />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
