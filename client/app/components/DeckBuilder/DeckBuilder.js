import React, { useState, useEffect } from 'react';
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
}

const DeckBuilder = props => {



    const [open, setOpen ] = useState(false);
    const [title, setTitle ] = useState('');
    const [ decks, setDecks ] = useState([]);
    const [ redirect, setRedirect ] = useState(false);
    const [ redirectUrl, setRedirectUrl ] = useState('')

    useEffect(() => {
        getDecks()
    },[])

    const handleDialog = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    };

    const createDeck = event => {
        event.preventDefault();
        const body = {
            title
        }
        axios.post("/api/deck/create", body)
            .then(res => {
                if (res.data.success) {
                    getDecks();
                    handleClose();
                    setRedirectUrl(`/deckview/${res.data.id}`);
                    setRedirect(true);
                }
            })
    }

    const getDecks = () => {
        axios.post("/api/deck/all")
            .then(res => {
                setDecks(res.data.decks);
            })
    }

        return (
            <div style={{ flexGrow: 1 }}>
                {redirect ? <Redirect to={redirectUrl} /> : null }
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom style={{ padding: "20px" }}>
                            Magic: The Gathering
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justify="flex-start" spacing={40} style={{ padding: "20px" }}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            All Decks
                        </Typography>
                    </Grid>

                    <NewDeck handleDialog={handleDialog} />

                    <AllDecks decks={decks} />

                </Grid>
                <NewDeckDialog open={open} handleClose={handleClose} setTitle={setTitle} title={title} createDeck={createDeck} />
            </div>
        )
}

export default withStyles(styles)(DeckBuilder);