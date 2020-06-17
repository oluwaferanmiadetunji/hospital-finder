import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import '../assets/History.css';
import Results from './Results';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import dayjs from 'dayjs';
import { getLocation } from '../redux/actions/userActions';

const History: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocation());
  }, []);
  return (
    <Grid container spacing={2} id="container">
      <Grid item xs={1} sm={1} md={1} lg={1} className="none"></Grid>
      <Grid item xs={12} sm={12} md={3} lg={3}>
        <Typography variant="h5" id="search-head">
          Search History
          <hr />
        </Typography>

        <Paper id="search-history">
          <Card style={{ background: 'none' }}>
            <ul id="history-panel">
              <li
                style={{ cursor: 'pointer', marginTop: 15 }}
                // key={index}
                // onClick={(): void => {
                //   see(result.url);
                // }}
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
                          color: 'black'
                        }}
                      >
                        {/* {dayjs(result.createdAt).format(
                          'MMMM DD, YYYY hh:mm a'
                        )} */}
                        Date
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
                          color: 'black'
                        }}
                      >
                        {/* {result.text} */}text
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              </li>
            </ul>
          </Card>
          <Typography variant="body1" style={{ marginTop: 20 }}>
            <Link to="/" style={{ color: 'red', fontSize: 20 }}>
              Search
            </Link>
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} className="none"></Grid>
      <Results />
      <Grid item xs={1} sm={1} md={2} lg={2} className="none"></Grid>
    </Grid>
  );
};
export default History;
