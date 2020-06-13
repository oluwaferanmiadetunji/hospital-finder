import React, { useState, useEffect } from 'react';
import '../styles/main.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ResultsDisplay } from './Results';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select/Select';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CardContent from '@material-ui/core/CardContent';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

const App: React.FC = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const [type, setType] = useState<string>('hospital');
  const [radius, setRadius] = useState<number>(1000);
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
    <Grid container spacing={2} id="container">
      <Grid item xs={1} sm={1} md={1} lg={1} className="none"></Grid>
      <Grid item xs={12} sm={12} md={3} lg={3}>
        <Paper>
          <Typography
            variant="h5"
            style={{
              backgroundColor: '#090226',
              color: 'white',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            Search
            <hr />
          </Typography>
          <Card style={{ marginBottom: 20 }}>
            <form>
              <div style={{ display: 'flex', marginBottom: 20 }}>
                <Grid
                  item
                  xs={12}
                  md={4}
                  lg={4}
                  sm={12}
                  style={{ textAlign: 'center' }}
                >
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
                      onChange={(
                        e: React.ChangeEvent<{ value: unknown }>
                      ): void => setRadius(e.target.value as number)}
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
                <Grid
                  item
                  xs={12}
                  md={8}
                  lg={8}
                  sm={12}
                  style={{ textAlign: 'left' }}
                >
                  <FormControl id="search-type-form">
                    <InputLabel
                      htmlFor="age-native-simple"
                      id="search-type-label"
                    >
                      Option
                    </InputLabel>
                    <Select
                      native
                      value={type}
                      onChange={(
                        e: React.ChangeEvent<{ value: unknown }>
                      ): void => {
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
                  id="search-param"
                  size="small"
                  fullWidth
                  placeholder="Search..."
                  variant="outlined"
                  value={searchText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    setSearchText(e.target.value)
                  }
                />
                <SearchIcon
                  // onClick={handleSubmit}
                  id="search-submit"
                  style={{
                    position: 'absolute',
                    right: 0,
                    width: 40,
                    height: 40,
                    backgroundColor: '#090226',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                />
              </Grid>
            </form>
          </Card>
          <Card id="search-history">
            <Typography
              variant="h5"
              style={{
                backgroundColor: '#090226',
                color: 'white',
                textAlign: 'center',
                padding: '10px 0',
                cursor: 'pointer'
              }}
            >
              Search History
            </Typography>
            <CardContent style={{ padding: 0 }}>
              <ul>
                <li style={{ cursor: 'pointer', marginTop: 15 }}>
                  <Card>
                    <Grid container style={{ display: 'block' }}>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sm={12}
                        lg={12}
                        style={{
                          display: 'flex',
                          marginBottom: 10,
                          marginLeft: 10
                        }}
                      >
                        <AccessTimeIcon style={{ color: 'red' }} />
                        <div
                          style={{
                            marginLeft: 5,
                            fontSize: 18,
                            fontWeight: 800,
                            color: '#090226'
                          }}
                        >
                          {/* {dayjs(result.createdAt).format('MMMM DD, YYYY hh:mm a')} */}
                          June 20, 2020 02:30 pm
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sm={12}
                        lg={12}
                        style={{
                          display: 'flex',
                          marginBottom: 10,
                          marginLeft: 10
                        }}
                      >
                        <LocalHospitalIcon style={{ color: 'red' }} />
                        <div
                          style={{
                            marginLeft: 5,
                            fontSize: 18,
                            marginTop: 5,
                            fontWeight: 800,
                            color: '#090226'
                          }}
                        >
                          {/* {result.text} */}
                          Clinic
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <ResultsDisplay />
      <Grid item xs={1} sm={1} md={1} lg={1} className="none"></Grid>
    </Grid>
  );
};
export default App;
