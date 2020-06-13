import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

export const ResultsDisplay: React.FC = () => {
  return (
    <Grid item xs={12} sm={12} md={7} lg={7}>
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
          Search Results
          <hr />
        </Typography>
        <Card>
          <CardContent style={{ padding: 0 }}>
            <ul>
              <li style={{ cursor: 'pointer' }}>
                <Card>
                  <Grid container style={{ display: 'flex' }}>
                    <Grid
                      item
                      xs={12}
                      md={5}
                      sm={12}
                      lg={4}
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
                          fontSize: 17,
                          fontWeight: 600,
                          marginTop: 5,
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
                      md={6}
                      sm={12}
                      lg={6}
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
  );
};
