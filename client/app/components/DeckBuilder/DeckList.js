import React, { useState, useEffect, useContext } from 'react';
//-----hooks//
import useDecks from '../../hooks/useDecks';
//-------------
import axios from "axios";
import SearchCards from "./SearchCards";
import ReplaceMana from './ReplaceMana';

import { SnackbarContext } from "../../globalState"

import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

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
    },
    tableBody: {
        fontSize: "30px !important"
    }
})

const DeckList = props => {
    const { classes } = props;
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ popperOpen, setPopperOpen ] = useState(false);
    const [ popperImg, setPopperImg ] = useState('');
    // const [ reload, setReload ] = useState(false)

    const { snackbar, setSnackbar, snackbarMessage, setSnackbarMessage } = useContext(SnackbarContext);
    

    const { cards, setCards, isLoading, reload, setReload } = useDecks(props.deckId);

    const handleImagePopper = e => {
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

    const handleDelete = (cardId) => {
        console.log(props.deckId)
        // setLoading(true)
        const body = {
            cardId: cardId,
            deckId: props.deckId
        }

        axios.post("/api/deck/deletecard", body)
            .then(res => {
                console.log(res)
                if (res.data.success) {
                    setReload(!reload);
                    // setCards(null)
                    setSnackbar(true);
                    setSnackbarMessage(res.data.message);
                    
                }
            })

    }



    return (
        <>
            {console.log(props.reload)}
            <Grid item xs={8}>
                {!isLoading ? <Paper className={classes.root}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Card Image</TableCell>
                                <TableCell align="left">Mana Cost</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Type</TableCell>
                                <TableCell align="left">Quantity</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tableBody}>
                            {cards.map((card, index) => {

                                return (
                                    <TableRow key={card._id + index}>
                                        <TableCell component="th" scope="row">
                                            <img src={card.imageUrl} width="60px" onMouseOver={e => handleImagePopper(e)} onMouseLeave={e => handleImagePopper(e)} />
                                        </TableCell>
                                        <TableCell ><ReplaceMana mana={card.manaCost} manaClass={classes.mana} /></TableCell>
                                        <TableCell align="left">{card.name}</TableCell>
                                        <TableCell align="left">{card.type}</TableCell>
                                        <TableCell align="left">{card.quantity}</TableCell>
                                        <TableCell align="left"><Button onClick={e => handleDelete(card.id)}><RemoveCircleIcon color="secondary" /></Button></TableCell>

                                    </TableRow>
                                )
                            }
                            )}
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