/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import '../assets/Auth.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { registerUser } from '../redux/actions/userActions';

interface RootState {
  UI: any;
}
const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<any>({});

  const history = useHistory();
  const dispatch = useDispatch();
  const UI = useSelector((state: RootState) => state.UI);

  useEffect(() => {
    setErrors(UI.errors);
  }, [UI]);
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const userData = { name, email, password, confirmPassword };
    dispatch(registerUser(userData, history));
  };
  let ButtonText = UI.loading ? 'Connecting...' : 'Register';
  return (
    <Grid container spacing={2} id="container">
      <Grid item xs={1} sm={1} md={4} lg={4} className="none"></Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <Card id="login-card" elevation={5}>
          <Typography className="sign-in">Sign Up</Typography>
          <form noValidate className="login-form" onSubmit={handleSubmit}>
            <TextField
              style={{ marginBottom: 20 }}
              autoFocus
              type="email"
              size="small"
              fullWidth
              placeholder="Name..."
              variant="outlined"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setName(e.target.value)}
              error={errors.name ? true : false}
              helperText={errors.name}
              autoComplete="name"
            />
            <TextField
              style={{ marginBottom: 20 }}
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
              autoComplete="new-password"
            />
            <TextField
              style={{ marginBottom: 20 }}
              type="password"
              size="small"
              fullWidth
              placeholder="Password again..."
              variant="outlined"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword}
              autoComplete="new-password"
            />
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
            Already have an account yet? Sign in&nbsp;&nbsp;
            <Link to="/login" style={{ color: 'red' }}>
              now
            </Link>
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={1} sm={1} md={4} lg={4} className="none"></Grid>
    </Grid>
  );
};
export default Register;
