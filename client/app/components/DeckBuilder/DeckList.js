import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import SearchCards from "./SearchCards";
import ReplaceMana from './ReplaceMana';

import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Zoom from '@material-ui/core/Zoom';
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper';
import LinearProgress from '@material-ui/core/LinearProgress';



import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';





const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    mana: {
        width: "15px",
        display: "block",
        marginBottom: "5px"
    }
})

const DeckList = props => {
    const { classes } = props;

    const [cards, setCards] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popperOpen, setPopperOpen] = useState(false);
    const [popperImg, setPopperImg] = useState('');

    useEffect(() => {
        axios.get(`/api/deck/${props.deckId}`)
            .then(res => {
                const { cardList, deck, success } = res.data
                console.log(res.data)
                setCards(cardList);
                setIsLoading(false);
            })
    }, [])

    const handleImagePopper = e => {

        // popperOpen ? setPopperOpen(false) : setPopperOpen(true);
        if (popperOpen) {
            setPopperOpen(false);
            setAnchorEl(null);
            setPopperImg('');
        } else {
            setPopperImg(e.target.getAttribute("src"))
            setAnchorEl(e.currentTarget);
            setPopperOpen(true);
        }
    }



    return (
        <>
        <Grid item xs={8} alignContent="center">
            {!isLoading ? <Paper className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Card Image</TableCell>
                            <TableCell align="left">Mana Cost</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Type</TableCell>
                            {/* <TableCell align="left">Card Text</TableCell> */}
                            {/* <TableCell align="left"></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map(card => (
                            <TableRow key={card.name}>
                                <TableCell component="th" scope="row">
                                    <img src={card.imageUrl} width="60px" onMouseOver={e => handleImagePopper(e)} onMouseLeave={e => handleImagePopper(e)} />
                                </TableCell>
                                <TableCell ><ReplaceMana mana={card.manaCost} manaClass={classes.mana} /></TableCell>
                                <TableCell align="left">{card.name}</TableCell>
                                <TableCell align="left">{card.type}</TableCell>
                                {/* <TableCell align="left">{card.text}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper> : <LinearProgress color="primary" />}
            {/* <LinearProgress width="100%" color="primary" /> */}

            <Popper open={popperOpen} anchorEl={anchorEl} transition placement="left">
                <Zoom in={popperOpen}>
                    <Paper>
                        <img src={popperImg} />
                    </Paper>
                </Zoom>
            </Popper>
            </Grid>
        </>
    )
}

export default withStyles(styles)(DeckList);