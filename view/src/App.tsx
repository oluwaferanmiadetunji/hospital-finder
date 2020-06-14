import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './main.css';
import { ACCESS_TOKEN, BASE_URL } from './constant';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
import dayjs from 'dayjs';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';

const App: React.FC = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const [type, setType] = useState<string>('hospital');
  const [radius, setRadius] = useState<number>(1000);
  const [results, setResults] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const url = `https://discover.search.hereapi.com/v1/discover?in=circle:${latitude},${longitude};r=${radius}&q=${searchText}+${type}&limit=100&apiKey=${ACCESS_TOKEN}`;

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

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const data = {
      text: `${searchText} ${type}`,
      url: url
    };
    setLoading(true);
    setResults([]);
    axios
      .get(url)
      .then((res) => {
        setResults(res.data.items);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setResults([]);
        console.log(err);
      });
    axios
      .post(`${BASE_URL}/search`, data)
      .then()
      .catch((err) => console.log(err));
  };

  const getSearchHistory = () => {
    axios
      .get(`${BASE_URL}/search`)
      .then((res) => {
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.log(err);
        setSearchResults([]);
        getSearchHistory();
      });
  };

  const see = (index: string) => {
    setLoading(true);
    axios
      .get(index)
      .then((res) => {
        setResults(res.data.items);
        setLoading(false);
      })
      .catch((err) => {
        setResults([]);
        setLoading(false);
        console.log(err);
      });
  };

  const recentSearchmarkup = searchResults.map(
    (
      result: {
        text: string;
        createdAt: string;
        url: string;
      },
      index: number
    ) => {
      return (
        <li
          style={{ cursor: 'pointer', marginTop: 15 }}
          key={index}
          onClick={(): void => {
            see(result.url);
          }}
        >
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
                  {dayjs(result.createdAt).format('MMMM DD, YYYY hh:mm a')}
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
                  {result.text}
                </div>
              </Grid>
            </Grid>
          </Card>
        </li>
      );
    }
  );
  const getCurrentData = () => {
    axios
      .get(url)
      .then((res) => {
        setResults(res.data.items);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setResults([]);
        console.log(err);
      });
  };

  useEffect(() => {
    getCurrentData();
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    getSearchHistory();
  }, []);

  const searchResultsMarkup = loading ? (
    <CircularProgress
      style={{
        width: 100,
        height: 100,
        margin: '35%',
        color: 'white'
      }}
    />
  ) : (
    <Paper style={{ background: 'none' }} elevation={2}>
      <Typography
        variant="h4"
        style={{
          color: 'white',
          textAlign: 'center',
          cursor: 'pointer'
        }}
      >
        Search Results
      </Typography>
      <Card style={{ marginTop: 10, background: 'none' }}>
        <CardContent style={{ padding: 0 }}>
          <Typography
            variant="h6"
            style={{
              color: 'white',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            Search count: {results.length}
          </Typography>

          <ul id="results">
            {results.map(
              (
                result: {
                  title: React.ReactNode;
                  distance: React.ReactNode;
                  address: { county: string; city: string; state: string };
                  position: { lat: number; lng: number };
                },
                index: number
              ) => {
                return (
                  <li style={{ cursor: 'pointer' }} key={index}>
                    <a
                      href={`https://www.google.com/maps/@${result.position.lat},${result.position.lng},20z`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Card elevation={2} style={{ marginBottom: 10 }}>
                        <div style={{ display: 'flex' }}>
                          <LocalHospitalIcon
                            style={{ width: 35, height: 35, color: 'red' }}
                          />
                          <div className="result-title">{result.title}</div>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <DirectionsWalkIcon
                            style={{ width: 35, height: 35, color: 'red' }}
                          />
                          <div className="result-distance">
                            <span>{result.distance}</span> metres away
                          </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <LocationOnIcon
                            style={{ width: 35, height: 35, color: 'red' }}
                          />
                          <div className="result-address">
                            {result.address.county && (
                              <span className="result-county">
                                {result.address.county}, &nbsp;
                              </span>
                            )}
                            {result.address.city && (
                              <span className="result-city">
                                {result.address.city}, &nbsp;
                              </span>
                            )}
                            {result.address.state && (
                              <span className="result-state">
                                {result.address.state} State
                              </span>
                            )}
                          </div>
                        </div>
                      </Card>
                    </a>
                  </li>
                );
              }
            )}
          </ul>
        </CardContent>
      </Card>
    </Paper>
  );
  return (
    <Grid container spacing={2} id="container">
      <Grid item xs={1} sm={1} md={1} lg={1} className="none"></Grid>
      <Grid item xs={12} sm={12} md={3} lg={3}>
        <Paper style={{ background: 'none' }} elevation={2}>
          <Typography
            variant="h4"
            style={{
              color: 'white',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            Search
          </Typography>
          <Card style={{ marginBottom: 20, marginTop: 10 }}>
            <form noValidate onSubmit={handleSubmit}>
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
                  onClick={handleSubmit}
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
          <Card style={{ background: 'none' }}>
            <Typography
              variant="h4"
              style={{
                background: 'none',
                color: 'white',
                textAlign: 'center',
                padding: '5px 0',
                cursor: 'pointer'
              }}
            >
              Search History
            </Typography>
            <CardContent
              style={{ padding: 0, background: 'white' }}
              id="search-history"
            >
              <ul>{recentSearchmarkup}</ul>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} className="none"></Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        {searchResultsMarkup}
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} className="none"></Grid>
    </Grid>
  );
};
export default App;
