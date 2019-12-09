import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeView from './views/HomeView.js';
import LoginView from './views/LoginView.js';
import SongView from './views/SongView.js';
import './app.css'


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <LoginView />
          </Route>
            <Route path="/song">
            <SongView />
          </Route>
          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
