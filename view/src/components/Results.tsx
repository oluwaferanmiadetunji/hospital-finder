import React from 'react';
import { useSelector } from 'react-redux';
import '../assets/Results.css';
//Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';

interface RootState {
  data: any;
  UI: any;
}
interface Results {
  title: string;
  distance: string;
  address: any;
  position: any;
}
const Results: React.FC = () => {
  const results = useSelector((state: RootState) => state.data.results);
  const loading = useSelector((state: RootState) => state.UI.resultsLoading);
  return loading ? (
    <CircularProgress id="spinner-bar" size={100} />
  ) : (
    <Grid item xs={12} sm={12} md={5} lg={5}>
      <Typography variant="h5" id="results-head">
        Search Results
        <hr />
      </Typography>
      <Typography id="results-count">{results.length} places found</Typography>
      <Paper id="results-panel" elevation={2}>
        <Card style={{ marginTop: 10, background: 'none' }}>
          <CardContent style={{ padding: 0, background: 'none' }}>
            <ul id="results">
              {results.map((result: Results, index: number) => {
                return (
                  <li style={{ cursor: 'pointer' }} key={index}>
                    <a
                      href={`https://www.google.com/maps/@${result.position.lat},${result.position.lng},20z`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Card elevation={2} id="singleResult">
                        <div style={{ display: 'flex' }}>
                          <LocalHospitalIcon style={{ width: 35, height: 35, color: 'red' }} />
                          <div className="result-title">{result.title}</div>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <DirectionsWalkIcon style={{ width: 35, height: 35, color: 'red' }} />
                          <div className="result-distance">
                            <span>{result.distance} </span>
                            metres away
                          </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <LocationOnIcon style={{ width: 35, height: 35, color: 'red' }} />
                          <div className="result-address">
                            {result.address.street && <span className="result-county">{result.address.street}, &nbsp;</span>}
                            {result.address.county && <span className="result-county">{result.address.county}, &nbsp;</span>}
                            {result.address.city && <span className="result-city">{result.address.city}, &nbsp;</span>}
                            {result.address.state && <span className="result-state">{result.address.state}</span>}
                          </div>
                        </div>
                      </Card>
                    </a>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  );
};
export default Results;
