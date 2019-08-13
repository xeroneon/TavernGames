import React, { useState, useContext } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios"
import { ModalContext, UserContext, SnackbarContext } from "../../globalState"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    container: {
        padding: "40px",
        marginTop: "50px",
        borderRadius: "10px",
        backgroundColor: "#333"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "10px"
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "flex-end"
    }
}

const SignUp = props => {
    const { classes } = props;

    const { setOpen } = useContext(ModalContext);
    const { loggedIn, setLoggedIn } = useContext(UserContext);
    const { setSnackbar, setSnackbarMessage } = useContext(SnackbarContext);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
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
    }

    if (loggedIn) {
        return <Redirect to="/" />
    }

    return (
        <>
            <div className={classes.container}>
                <form className={classes.grid}>
                    <TextField
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
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        name="email"
                        fullWidth
                        variant="outlined"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="firstName"
                        name="firstName"
                        fullWidth
                        variant="outlined"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                    />
                    <TextField
                        margin="dense"
                        id="lastName"
                        label="Last Name"
                        type="lastName"
                        name="lastName"
                        fullWidth
                        variant="outlined"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
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
                </form>
                <div className={classes.buttonContainer}>
                <Button variant="contained" onClick={e => handleSubmit(e)} color="primary" type="submit">
                    Submit
                </Button>
                </div>
            </div>
        </>
    )
}

export default withStyles(styles)(SignUp)