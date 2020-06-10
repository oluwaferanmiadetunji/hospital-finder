import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select/Select';

interface Params {
  color: string;
}

const App: React.FC = () => {
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
                  // value={state.age}
                  // onChange={handleChange}
                  inputProps={{
                    name: 'search-radius',
                    id: 'search-radius'
                  }}
                >
                  <option value={1}>1 km</option>
                  <option value={2}>2 km</option>
                  <option value={3}>3 km</option>
                  <option value={5}>5 km</option>
                  <option value={10}>10 km</option>
                  <option value={20}>20 km</option>
                  <option value={30}>30 km</option>
                  <option value={40}>40 km</option>
                  <option value={50}>50 km</option>
                </Select>
              </FormControl>
            </div>

            <div className="search-text">
              <TextField
                id="search-param"
                size="small"
                placeholder="Search for Hospitals around ..."
                variant="outlined"
              />
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default App;
