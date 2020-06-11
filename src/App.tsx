import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { ACCESS_TOKEN } from './components/constant';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select/Select';
import Display from './components/Display';

const App: React.FC = () => {
  const [radius, setRadius] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const success = (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  const error = () => {
    alert('Location is not enabled');
  };
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };
  const getLocation = () => {
    navigator.geolocation.watchPosition(success, error, options);
  };
  useEffect(() => {
    getLocation();
    // axios.get(
    //   `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?&access_token=${process.env.REACT_APP_API_KEY}`
    // );
    // console.log(
    //   `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${longitude},${latitude}&access_token=${ACCESS_TOKEN}`
    // );
    console.log(latitude);
    console.log(longitude);
  });
  return (
    <Grid container>
      <div className="main">
        <AppBar
          id="appBar"
          position="relative"
          color="inherit"
          elevation={0}
          style={{ backgroundColor: '#282c34' }}
        >
          <Toolbar className="header">
            <h1 id="heading">Hospital Finder</h1>
            <SearchIcon id="search-icon" />
          </Toolbar>
        </AppBar>

        <div className="container">
          <div className="search">
            <div className="search-radius">
              <FormControl id="search-radius-form">
                <InputLabel
                  htmlFor="age-native-simple"
                  id="search-radius-label"
                >
                  Radius
                </InputLabel>
                <Select
                  native
                  value={radius}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>): void =>
                    setRadius(e.target.value as number)
                  }
                  inputProps={{
                    name: 'search-radius',
                    id: 'search-radius'
                  }}
                >
                  <option value={1000}>1 km</option>
                  <option value={2000}>2 km</option>
                  <option value={3000}>3 km</option>
                  <option value={5000}>5 km</option>
                  <option value={10000}>10 km</option>
                  <option value={20000}>20 km</option>
                  <option value={30000}>30 km</option>
                  <option value={40000}>40 km</option>
                  <option value={50000}>50 km</option>
                </Select>
              </FormControl>
            </div>

            <div className="search-text">
              <TextField
                id="search-param"
                size="small"
                placeholder="Search for Hospitals around ..."
                variant="outlined"
                value={searchText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  setSearchText(e.target.value)
                }
              />
            </div>
          </div>
          <div className="search-results">
            <Display />
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default App;
