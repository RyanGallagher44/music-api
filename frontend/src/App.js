import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="App bg-gray-50">
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
