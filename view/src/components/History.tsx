import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import '../assets/History.css';
import Results from './Results';
// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

import dayjs from 'dayjs';
import { getLocation } from '../redux/actions/userActions';
import { getHistory, seeHistory } from '../redux/actions/DataActions';

interface RootState {
  user: any;
  data: any;
  UI: any;
}

const GET_HISTORIES = gql`
  query Histories($email: String) {
    getHistories(email: $email) {
      url
      createdAt
      searchText
      email
    }
  }
`;
interface History {
  url: string;
  createdAt: string;
  searchText: any;
}
const History: React.FC = () => {
  const histories = useSelector((state: RootState) => state.data.history);
  const dispatch = useDispatch();
  const userEmail = useSelector((state: RootState) => state.user.email);
  const { loading, data } = useQuery(GET_HISTORIES, { variables: { email: userEmail } });

  loading ? console.log('Loading') : dispatch(getHistory(data.getHistories));
  useEffect(() => {
    dispatch(getLocation());
  }, [dispatch]);
  return (
    <Grid container spacing={2} id="container">
      <Grid item xs={1} sm={1} md={1} lg={1} className="none"></Grid>
      <Grid item xs={12} sm={12} md={3} lg={3}>
        <Typography variant="h5" id="history-head">
          Search History
          <hr />
        </Typography>

        <Paper id="search-history">
          <Card style={{ background: 'none' }}>
            <ul id="history-panel">
              {histories.map((history: History, index: number) => {
                return (
                  <li
                    style={{ cursor: 'pointer', marginTop: 15 }}
                    key={index}
                    onClick={(): void => {
                      dispatch(seeHistory(history.url));
                    }}
                  >
                    <Card elevation={2} id="singleHistory">
                      <div style={{ display: 'flex' }}>
                        <AccessTimeIcon style={{ width: 30, height: 30, color: 'red' }} />
                        <div className="history-text">{dayjs(history.createdAt).format('MMMM DD, YYYY hh:mm a')}</div>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <LocalHospitalIcon style={{ width: 35, height: 35, color: 'red' }} />
                        <div className="history-date">
                          <span>{history.searchText} Hospital </span>
                        </div>
                      </div>
                    </Card>
                  </li>
                );
              })}
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
