import React, { useContext, useState } from 'react';
import { ModalContext, UserContext, SnackbarContext } from "../../globalState";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modal = props => {

    const {open, setOpen } = useContext(ModalContext);
    const {loggedIn, setLoggedIn, userImage, setUserImage } = useContext(UserContext);
    const { snackbar, setSnackbar, snackbarMessage, setSnackbarMessage } = useContext(SnackbarContext);
    const [signup, setSignup ] = useState(false);
    const [email, setEmail ] = useState('');
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    const [firstName, setFirstName ] = useState('');
    const [lastName, setLastName ] = useState('');


    const handleClose = () => {
        if (open) {
            setOpen(false)
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (signup === true) {
    
          const newUser = {
            email,
            username,
            password,
            firstName,
            lastName
          }
          axios.post("/api/users/signup", newUser)
            .then(res => {
              console.log("signed up")
              if (res.data.success) {
                  setOpen(false);
                  setEmail('');
                  setPassword('');
                  setFirstName('');
                  setLastName('');
                  setUsername('');
                  setLoggedIn(true);
                  setSnackbar(true);
                  setSnackbarMessage(res.data.message);
              }
            })
            .catch(err => console.log(err));
        } else {
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
                setFirstName('');
                setLastName('');
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
      }

    return (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="body"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{signup ? "Sign Up" : "Login"}</DialogTitle>
          <form>
            <DialogContent>
              {signup ? <TextField
                autoFocus
                margin="dense"
                id="username"
                label="Username"
                type="username"
                name="username"
                fullWidth
                variant="outlined"
                onChange={e => setUsername(e.target.value)}
                value={username}
              /> : <div></div>}
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label={signup ? "Email Address" : "Username / Email Address"}
                type="email"
                name="email"
                fullWidth
                variant="outlined"
                onChange={e => setEmail(e.target.value)}
                value={email}
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

              {signup ? <TextField
                margin="dense"
                id="firstName"
                label="First Name"
                type="firstName"
                name="firstName"
                fullWidth
                variant="outlined"
                onChange={e => setFirstName(e.target.value)}
                value={firstName}
              /> : <div></div>}

              {signup ? <TextField
                margin="dense"
                id="lastName"
                label="Last Name"
                type="lastName"
                name="lastName"
                fullWidth
                variant="outlined"
                onChange={e => setLastName(e.target.value)}
                value={lastName}
              /> : <div></div>}
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={e => setSignup(!signup)} color="primary">
                {signup ? "Login" : "Sign Up"}
              </Button>
              <Button variant="contained" onClick={e => handleSubmit(e)} color="primary" type="submit">
                Submit
            </Button>
            </DialogActions>
          </form>
        </Dialog>
    )
}

export default Modal;