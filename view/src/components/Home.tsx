import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import '../assets/Home.css';
import Results from './Results';
// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select/Select';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import { getLocation } from '../redux/actions/userActions';
import { getResult } from '../redux/actions/DataActions';

interface RootState {
  user: any;
}

const Home: React.FC = () => {
  const [radius, setRadius] = useState<number>(1000);
  const [type, setType] = useState<string>('hospital');
  const [searchText, setSearchText] = useState<string>('');
  const latitude = useSelector((state: RootState) => state.user.coordinates.latitude);
  const longitude = useSelector((state: RootState) => state.user.coordinates.longitude);
  const dispatch = useDispatch();
  
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const data = { radius, type, searchText, latitude, longitude };
    dispatch(getResult(data));
  };
  useEffect(() => {
    dispatch(getLocation());
  }, [dispatch]);
  return (
    <Grid container spacing={2} id="container">
      <Grid item xs={1} sm={1} md={1} lg={1} className="none"></Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} id="search-panel">
        <Typography variant="h5" id="search-head">
          Search for Medical facilities
          <hr />
        </Typography>

        <Card id="search-form">
          <form noValidate onSubmit={handleSubmit}>
            <div style={{ display: 'flex', marginBottom: 20 }}>
              <Grid item xs={12} md={4} lg={4} sm={12} style={{ textAlign: 'center' }}>
                <FormControl id="search-radius-form">
                  <InputLabel htmlFor="age-native-simple" id="search-radius-label">
                    Radius
                  </InputLabel>
                  <Select
                    native
                    value={radius}
                    onChange={(e: React.ChangeEvent<{ value: unknown }>): void => setRadius(e.target.value as number)}
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
              </Grid>
              <Grid item xs={12} md={8} lg={8} sm={12} style={{ textAlign: 'left' }}>
                <FormControl id="search-type-form">
                  <InputLabel htmlFor="age-native-simple" id="search-type-label">
                    Option
                  </InputLabel>
                  <Select
                    native
                    value={type}
                    onChange={(e: React.ChangeEvent<{ value: unknown }>): void => {
                      setType(e.target.value as string);
                    }}
                    inputProps={{
                      name: 'search-type',
                      id: 'search-type'
                    }}
                  >
                    <option value={'hospital'}>Hospital</option>
                    <option value={'pharmacy'}>Pharmacy</option>
                    <option value={'clinic'}>Clinic</option>
                    <option value={'medical'}>Medical Offices</option>
                  </Select>
                </FormControl>
              </Grid>
            </div>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              style={{
                marginLeft: 20,
                marginRight: 20,
                position: 'relative',
                marginBottom: 10
              }}
            >
              <TextField
                autoFocus
                id="search-param"
                size="small"
                fullWidth
                placeholder="Search..."
                variant="outlined"
                value={searchText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearchText(e.target.value)}
              />
              <SearchIcon
                onClick={handleSubmit}
                id="search-submit"
                style={{
                  position: 'absolute',
                  right: 0,
                  width: 42,
                  height: 42,
                  background: 'none',
                  color: 'white',
                  cursor: 'pointer'
                }}
              />
            </Grid>
          </form>
          <Typography variant="body1">
            <Link to="/history" style={{ color: 'red', fontSize: 20 }}>
              Check search history
            </Link>
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} className="none"></Grid>
      <Results />
      <Grid item xs={1} sm={1} md={2} lg={2} className="none"></Grid>
    </Grid>
  );
};
export default Home;
