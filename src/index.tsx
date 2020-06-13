import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

ReactDOM.render(
  <React.StrictMode>
    <AppBar id="appBar" elevation={0}>
      <Toolbar className="header">
        <h1 id="heading">Hospital Finder</h1>
      </Toolbar>
    </AppBar>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
