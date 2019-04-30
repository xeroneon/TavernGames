import React, {createContext, useState } from 'react';

export const SnackbarContext = createContext()

export function SnackbarProvider(props) {

    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(false);


    return(
        <SnackbarContext.Provider
            value={{snackbar, setSnackbar, snackbarMessage, setSnackbarMessage}}
        >
        {props.children}
        </SnackbarContext.Provider>
    );
}