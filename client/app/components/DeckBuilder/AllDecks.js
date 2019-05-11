import React from 'react';
import { Link } from "react-router-dom";
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

const AllDecks = props => {
    const { classes, decks } = props
    return (
        <>
            {decks ? decks.map(deck => {
                return <Grid item xs={6} md={2} key={deck._id} style={{ textAlign: "center" }}>
                    <Link to={`/deckview/${deck._id}`}>
                        <img id="deck" src="/assets/img/mtg-card-back.png" style={{ borderRadius: "15px", height: "250px" }} />
                    </Link>
                    <Typography variant="h6" gutterBottom>
                        {deck.title}
                    </Typography>
                </Grid>
            }) : undefined}
        </>
    )
}

export default withStyles(styles)(AllDecks);