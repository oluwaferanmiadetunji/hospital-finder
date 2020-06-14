import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LocationOnIcon from '@material-ui/icons/LocationOn';

ReactDOM.render(
  <React.StrictMode>
    <div id="app-container">
      <AppBar id="appBar" elevation={0}>
        <Toolbar className="header">
          <h1 id="heading">
            Hospital F<LocationOnIcon />
            nder
          </h1>
        </Toolbar>
      </AppBar>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
