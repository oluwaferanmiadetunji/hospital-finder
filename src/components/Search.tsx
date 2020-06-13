/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './Search.css';
import axios from 'axios';
import { ACCESS_TOKEN, BASE_URL } from './constant';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select/Select';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import Card from '@material-ui/core/Card';

interface Coordinates {
  longitude: number;
  latitude: number;
}
interface Props {
  coordinate: Coordinates;
}
export const Search: React.FC<Props> = ({ coordinate }) => {
  const latitude = coordinate.latitude;
  const longitude = coordinate.longitude;
  const [searchText, setSearchText] = useState<string>('');
  const [radius, setRadius] = useState<number>(1000);
  const [type, setType] = useState<string>('hospital');
  const url = `https://discover.search.hereapi.com/v1/discover?in=circle:${latitude},${longitude};r=${radius}&q=${searchText}+${type}&limit=100&apiKey=${ACCESS_TOKEN}`;
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [typeLabel, setTypeLabel] = useState<string>('');
  let searchType;
  if (typeLabel === 'hospital') searchType = 'Hospitals';
  else if (typeLabel === 'clinic') searchType = 'Clinics';
  else if (typeLabel === 'pharmacy') searchType = 'Pharmacies';
  else if (typeLabel === 'medical') searchType = 'Medical Offices';

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    setTypeLabel(type);
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
  };
  const displayMarkup = loading ? (
    <CircularProgress
      style={{
        width: 100,
        height: 100,
        marginLeft: '30%',
        marginTop: '30%',
        color: 'black'
      }}
    />
  ) : (
    results.map(
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
          <li key={index}>
            <a
              href={`https://www.google.com/maps/@${result.position.lat},${result.position.lng},20z`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Card style={{ backgroundColor: 'ghostwhite' }} elevation={2}>
                <div style={{ display: 'flex' }}>
                  <LocalHospitalIcon />
                  <div className="result-title">{result.title}</div>
                </div>
                <div style={{ display: 'flex' }}>
                  <DirectionsWalkIcon className="small-icon" />
                  <div className="result-distance">
                    <span>{result.distance}</span> metres away
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <LocationOnIcon className="small-icon" />
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
    )
  );
  return (
    <Grid item xs={12} id="search-panel">
      <Paper style={{ backgroundColor: 'ghostwhite' }} elevation={2}>
        <div style={{ display: 'flex', marginBottom: 20 }}>
          <Grid item xs={4} md={4} lg={4} id="search-radius-div">
            <FormControl id="search-radius-form">
              <InputLabel htmlFor="age-native-simple" id="search-radius-label">
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
          </Grid>
          <Grid item xs={8} md={8} lg={8} id="search-radius-div">
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
        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex' }}>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{ marginLeft: 20, marginRight: 20, position: 'relative' }}
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
        </Grid>
        <hr />

        {results.length > 0 && (
          <>
            <div className="count">
              {results.length} {searchType} found
            </div>
            <hr />
          </>
        )}

        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          id="search-results"
          style={{ backgroundColor: 'white' }}
        >
          <ul>{displayMarkup}</ul>
        </Grid>
      </Paper>
    </Grid>
  );
};
