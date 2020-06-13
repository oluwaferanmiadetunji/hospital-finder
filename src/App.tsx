import React, { useEffect, useState } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import { Search } from './components/Search';
import { RecentSearch } from './components/RecentSearch';

const App: React.FC = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const showPosition = (position: {
    coords: {
      latitude: React.SetStateAction<number>;
      longitude: React.SetStateAction<number>;
    };
  }) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('Location service is unavailable');
    }
  };
  useEffect(() => {
    getLocation();
    console.log(`Latitude: ${latitude}, Longitude:${longitude}`);
  }, [latitude, longitude]);
  return (
    <Grid container>
      <AppBar id="appBar" color="inherit" elevation={0}>
        <Toolbar className="header">
          <h1 id="heading">Hospital Finder</h1>
          <SearchIcon id="search-icon" style={{ color: 'white' }} />
        </Toolbar>
      </AppBar>
      <div className="container">
        <Search coordinate={{ longitude, latitude }} />
        <RecentSearch />
      </div>
    </Grid>
  );
};
export default App;
