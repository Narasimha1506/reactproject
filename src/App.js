import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import WeatherComponent from './WeatherComponent/weathermain.js';
import RecipeComponent from './RecipeComponent/Recipemain.js';
import './App.css'; 

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink exact to="/" className={({ isActive }) => isActive ? 'active' : ''}>Weather</NavLink>
            </li>
            <li>
              <NavLink to="/recipes" className={({ isActive }) => isActive ? 'active' : ''}>Recipes</NavLink>
            </li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<WeatherComponent />} />
            <Route path="/recipes" element={<RecipeComponent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
