import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    cardStyle: {
        backgroundColor: "#494949",
        borderRadius: "15px",
        height: "250px",
        width: "179px",
        lineHeight: "250px",
        textAlign: "center",
        fontSize: "70px",
        color: "#FFF"
    }
}

const NewDeck = props => {
    const { classes } = props
    return (
        <>
            <Grid item xs={6} md={2}>
            <Grid container justify="center">
                <Paper
                    onClick={props.handleDialog}
                    id="newDeck"
                    className={classes.cardStyle}
                >
                    <AddCircleOutlinedIcon color="primary" style={{ fontSize: "50px" }} />
                </Paper>
            </Grid>
            </Grid>
        </>
    )
}

export default withStyles(styles)(NewDeck);