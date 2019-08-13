import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { ModalContext, UserContext, SnackbarContext } from "../../globalState";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modal = props => {

  const { open, setOpen } = useContext(ModalContext);
  const { loggedIn, setLoggedIn, userImage, setUserImage } = useContext(UserContext);
  const { snackbar, setSnackbar, snackbarMessage, setSnackbarMessage } = useContext(SnackbarContext);
  // const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleClose = () => {
    if (open) {
      setOpen(false)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("login");

    const returningUser = {
      email,
      username,
      password
    }
    axios.post("/api/users/login", returningUser)
      .then(res => {
        console.log("logged in")
        if (res.data.success) {
          setOpen(false);
          setEmail('');
          setPassword('');
          setUsername('');
          setLoggedIn(true);
          setSnackbar(true);
          setSnackbarMessage(res.data.message);
          setUserImage(res.data.user.photo)
        } else {
          setSnackbar(true);
          setSnackbarMessage(res.data.message);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="body"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Login</DialogTitle>
      <form>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Username / Email Address"
            type="email"
            name="email"
            fullWidth
            variant="outlined"
            onChange={e => {setEmail(e.target.value); setUsername(e.target.value)}}
            value={email || username}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            name="password"
            fullWidth
            variant="outlined"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </DialogContent>
        <DialogActions>
          <Link to="/signup">
            <Button variant="outlined" onClick={() => setOpen(false)} color="primary">
              Sign Up
              </Button>
          </Link>
          <Button variant="contained" onClick={e => handleSubmit(e)} color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default Modal;