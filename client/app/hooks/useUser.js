import React, { useState, useEffect, useContext } from 'react';
import { UserContext, SnackbarContext } from "../globalState";

import axios from 'axios'

const useUser = () => {
    const { snackbar, setSnackbar, snackbarMessage, setSnackbarMessage } = useContext(SnackbarContext);

    const { username, setUsername, userImage, setUserImage, loggedIn, setLoggedIn, admin, setAdmin } = useContext(UserContext);

    useEffect(() => {
        axios.get("/api/users/authenticate")
            .then(res => {
                console.log(res)

                if (res.data.authenticated) {
                    res.data.user.role > 1 ? setAdmin(true) : setAdmin(false);
                    setLoggedIn(true);
                    setUserImage(res.data.user.photo);
                    setUsername(res.data.user.username);
                } else {
                    setLoggedIn(false)
                }
            })
    }, [username])

    const logout = () => {
        axios.get("/api/users/logout")
            .then(res => {
                if (res.data.loggedOut) {
                    setLoggedIn(false);
                    setSnackbar(true);
                    setSnackbarMessage("Successful Logout")
                    // userMenuClose();
                }
            })
    }

    return {
        username,
        setUsername,
        userImage,
        setUserImage,
        admin,
        setAdmin,
        loggedIn,
        setLoggedIn,
        logout
    }

}

export default useUser;