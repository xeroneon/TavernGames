import React, { useState, useEffect } from 'react';
//-----hooks//
import useDecks from '../../hooks/useDecks';
//-------------
import { Redirect } from "react-router";
import NewDeck from "./NewDeck";
import AllDecks from "./AllDecks";
import NewDeckDialog from "./NewDeckDialog";

import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    container: {
        backgroundColor: "#333 !important",
        width: "100%",
        borderRadius: "10px"
    }
}

const DeckBuilder = props => {

    const { classes } = props;

    const [ open, setOpen ] = useState(false);
    const [ title, setTitle ] = useState('');
    const [ redirect, setRedirect ] = useState(false);
    const [ redirectUrl, setRedirectUrl ] = useState('')

    const { decks } = useDecks();

    const handleDialog = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    };

    const createDeck = event => {
        event.preventDefault();
        axios.post("/api/deck/create", {title})
            .then(res => {
                if (res.data.success) {
                    // getDecks();
                    handleClose();
                    setRedirectUrl(`/deckview/${res.data.id}`);
                    setRedirect(true);
                }
            })
    }

        return (
            <div style={{ flexGrow: 1 }}>
                {redirect ? <Redirect to={redirectUrl} /> : null }
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom style={{ padding: "50px" }}>
                            Magic: The Gathering
                        </Typography>
                    </Grid>
                </Grid>
                    <div className={classes.container}>
                <Grid container justify="flex-start" spacing={40} style={{ padding: "20px"}}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            All Decks
                        </Typography>
                    </Grid>

                    <NewDeck handleDialog={handleDialog} />

                    <AllDecks decks={decks} />
                </Grid>
                    </div>
                <NewDeckDialog open={open} handleClose={handleClose} setTitle={setTitle} title={title} createDeck={createDeck} />
            </div>
        )
}

export default withStyles(styles)(DeckBuilder);