import React, { useContext } from 'react';
import {SnackbarContext } from "../../globalState";
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const Snack = props => {

    const { snackbar, setSnackbar, snackbarMessage, setSnackbarMessage } = useContext(SnackbarContext);



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbar(false)
      };


    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={snackbar}
            autoHideDuration={6000}
            onClose={e => handleClose()}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{snackbarMessage}</span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="primary"
                    className={'classes.close'}
                    onClick={e => handleClose()}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    )
}

export default Snack;