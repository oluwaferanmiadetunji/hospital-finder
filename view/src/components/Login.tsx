/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import '../assets/Auth.css';
// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// redux
import { loginUser } from '../redux/actions/userActions';

interface RootState {
  UI: any;
}
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<any>({});

  const history = useHistory();
  const dispatch = useDispatch();
  const UI = useSelector((state: RootState) => state.UI);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const userData = { email, password };
    dispatch(loginUser(userData, history));
  };

  useEffect(() => {
    setErrors(UI.errors);
  }, [UI]);

  let ButtonText = UI.loading ? 'Connecting...' : 'Login';
  return (
    <Grid container spacing={2} id="container">
      <Grid item xs={1} sm={1} md={4} lg={4} className="none"></Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <Card id="login-card" elevation={5}>
          <Typography className="sign-in">Sign In</Typography>
          <form noValidate className="login-form" onSubmit={handleSubmit}>
            <TextField
              style={{ marginBottom: 20 }}
              autoFocus
              type="email"
              size="small"
              fullWidth
              placeholder="Email..."
              variant="outlined"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
              error={errors.email ? true : false}
              helperText={errors.email}
              autoComplete="email"
            />
            <TextField
              style={{ marginBottom: 20 }}
              type="password"
              size="small"
              fullWidth
              placeholder="Password..."
              variant="outlined"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)}
              error={errors.password ? true : false}
              helperText={errors.password}
              autoComplete="current-password"
            />
            {errors.general && (
              <Typography variant="body1" style={{ color: 'red', marginBottom: 10 }}>
                {errors.general}
              </Typography>
            )}
            <Button
              style={{
                background: 'midnightblue',
                color: 'white',
                fontSize: 18,
                fontWeight: 900
              }}
              disabled={UI.loading}
              type="submit"
            >
              {ButtonText}
            </Button>
          </form>
          <Typography variant="body1" style={{ color: 'white' }}>
            Don't have an account yet? Sign up&nbsp;&nbsp;
            <Link to="/register" style={{ color: 'red' }}>
              now
            </Link>
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={1} sm={1} md={4} lg={4} className="none"></Grid>
    </Grid>
  );
};
export default Login;
