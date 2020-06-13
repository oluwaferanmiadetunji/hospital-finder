/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import './RecentSearch.css';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import dayjs from 'dayjs';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import Backdrop from '@material-ui/core/Backdrop';
import { BASE_URL } from './constant';

export const RecentSearch: React.FC = () => {
  const [results, setResults] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [searchIndex, setSearchIndex] = useState<string>('');
  const getSearchHistory = () => {
    axios
      .get(`${BASE_URL}/search`)
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setResults([]);
        console.log(err.response.code);
        getSearchHistory();
      });
  };

  const see = (index: string) => {
    setSearchIndex(index);
    axios
      .get(index)
      .then((res) => {
        setSearchResults(res.data.items);
        setOpen(true);
      })
      .catch((err) => {
        setResults([]);
        setOpen(true);
        console.log(err);
      });
  };

  useEffect(() => {
    getSearchHistory();
  }, []);

  const resultsMarkup = loading ? (
    <CircularProgress
      style={{
        width: 100,
        height: 100,
        marginLeft: '40%',
        marginTop: '25%',
        color: 'black'
      }}
    />
  ) : (
    results.map(
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
            key={index}
            onClick={(): void => {
              see(result.url);
            }}
          >
            <Card style={{ backgroundColor: 'ghostwhite' }} elevation={2}>
              <Grid container id="container">
                <Grid item xs={12} md={6} sm={12} lg={6} id="date-info">
                  <AccessTimeIcon className="icon" />
                  <div className="date">
                    {dayjs(result.createdAt).format('MMMM DD, YYYY hh:mm a')}
                  </div>
                </Grid>
                <Grid item xs={12} md={5} sm={12} lg={5} id="text-info">
                  <LocalHospitalIcon className="icon" />
                  <div className="text">{result.text}</div>
                </Grid>
              </Grid>
            </Card>
          </li>
        );
      }
    )
  );

  const displayMarkup = searchResults.map(
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
          <a href={searchIndex} target="_blank" rel="noreferrer noopener">
            <Card id="search-card" elevation={2}>
              <div style={{ display: 'flex' }}>
                <LocalHospitalIcon
                  style={{ width: 30, height: 30, color: 'red' }}
                />
                <div className="result-title">{result.title}</div>
              </div>
              <div style={{ display: 'flex' }}>
                <DirectionsWalkIcon
                  style={{ width: 30, height: 30, color: 'red' }}
                />
                <div className="result-distance">
                  <span>{result.distance}</span> metres away
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <LocationOnIcon
                  style={{ width: 30, height: 30, color: 'red' }}
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
  );
  return (
    <Grid item xs={12} id="recent-search-panel">
      <div
        style={{
          backgroundColor: '#090226',
          color: 'white',
          height: 40,
          marginTop: -20
        }}
      >
        <h2 style={{ paddingTop: 5, textAlign: 'center' }}>Search History</h2>
      </div>

      <Paper style={{ backgroundColor: 'ghostwhite' }} elevation={2}>
        <div className="search-history">
          <ul>{resultsMarkup}</ul>
        </div>
      </Paper>
      <Dialog
        id="search-container"
        open={open}
        onClose={(): void => {
          setOpen(false);
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogActions>
          <Button
            onClick={(): void => {
              setOpen(false);
            }}
            style={{ color: 'white', backgroundColor: 'red' }}
          >
            Close
          </Button>
        </DialogActions>
        <DialogContent>
          <ul>{displayMarkup}</ul>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};
