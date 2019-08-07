import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import SearchCards from "./SearchCards"
import DeckList from "./DeckList"

import LinearProgress from '@material-ui/core/LinearProgress';



import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Zoom from '@material-ui/core/Zoom';





const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    container: {
        marginTop: "50px",
        marginBottom: "50px"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        }
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
})

const DeckView = props => {
    const { classes } = props;
    const { id } = props.match.params;
    const [ search, setSearch ] = useState('');
    const [ searchCards, setSearchCards ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const handleSearch = () => {
        setLoading(true);
        const body = {
            name: search
        }
        axios.post("/api/card/search", body)
        .then(res => {
            console.log(res);
            setLoading(false);
            setSearchCards(res.data.cards)
        })
    }


    return (
        <>
            {/* <p>{props.match.params.id}</p> */}
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={4}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon color="primary" />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onChange={e => setSearch(e.target.value)}
                            value={search}
                        />
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="primary" disabled={loading} onClick={() => handleSearch()}>
                        {loading ? <CircularProgress className={classes.progress} color="primary" size={20} /> : "Search"}
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={40}>
                {searchCards[0] ? <SearchCards deckId={id} cards={searchCards} /> : null}
            </Grid>
            <br/>
            <br/>
            <br/>
            <Grid container justify="center">
                {/* <CircularProgress color="primary"/> */}
                <DeckList deckId={id} />

            </Grid>
        </>
    )
}

export default withStyles(styles)(DeckView);