import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
// import ReplaceMana from '../../../../utils/ReplaceMana'
import ReplaceMana from './ReplaceMana';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Zoom from '@material-ui/core/Zoom';
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
// import ReplaceMana from '../../../../utils/ReplaceMana';



const styles = theme => ({
    root: {
        width: "100%",
        overflowX: "auto"
    },
    grow: {
        flexGrow: 1,
    },
    row: {
        height: "100px"
    },
    mana: {
        width: "15px",
        display: "block",
        marginBottom: "5px"
    }
})

const SearchCards = props => {
    const { classes } = props
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(props.cards.length);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popperOpen, setPopperOpen] = useState(false);
    const [popperImg, setPopperImg] = useState('');

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

    const addCard = (cardId) => {
        console.log(props.deckId)
        const body = {
            cardId: cardId,
            deckId: props.deckId
        }

        axios.post("/api/deck/addcard", body)
            .then(res => {
                console.log(res.message)
            })

    }

    const replaceMana = (mana) => {
        if (!mana) {
            return
        }
        const manaArray = mana.split("");

        return manaArray.map(character => {

            switch (character) {
                case "{": return ""
                    break;
                case "}": return ""
                    break;
                case "0": return <img src="/assets/img/mtg-symbols/0.png" className={classes.mana} />
                    break;
                case "1": return <img src="/assets/img/mtg-symbols/1.png" className={classes.mana} />
                    break;
                case "2": return <img src="/assets/img/mtg-symbols/2.png" className={classes.mana} />
                    break;
                case "3": return <img src="/assets/img/mtg-symbols/3.png" className={classes.mana} />
                    break;
                case "4": return <img src="/assets/img/mtg-symbols/4.png" className={classes.mana} />
                    break;
                case "5": return <img src="/assets/img/mtg-symbols/5.png" className={classes.mana} />
                    break;
                case "6": return <img src="/assets/img/mtg-symbols/6.png" className={classes.mana} />
                    break;
                case "7": return <img src="/assets/img/mtg-symbols/7.png" className={classes.mana} />
                    break;
                case "8": return <img src="/assets/img/mtg-symbols/8.png" className={classes.mana} />
                    break;
                case "9": return <img src="/assets/img/mtg-symbols/9.png" className={classes.mana} />
                    break;
                case "10": return <img src="/assets/img/mtg-symbols/10.png" className={classes.mana} />
                    break;
                case "11": return <img src="/assets/img/mtg-symbols/11.png" className={classes.mana} />
                    break;
                case "12": return <img src="/assets/img/mtg-symbols/12.png" className={classes.mana} />
                    break;
                case "13": return <img src="/assets/img/mtg-symbols/13.png" className={classes.mana} />
                    break;
                case "14": return <img src="/assets/img/mtg-symbols/14.png" className={classes.mana} />
                    break;
                case "15": return <img src="/assets/img/mtg-symbols/15.png" className={classes.mana} />
                    break;
                case "16": return <img src="/assets/img/mtg-symbols/16.png" className={classes.mana} />
                    break;
                case "17": return <img src="/assets/img/mtg-symbols/17.png" className={classes.mana} />
                    break;
                case "18": return <img src="/assets/img/mtg-symbols/18.png" className={classes.mana} />
                    break;
                case "19": return <img src="/assets/img/mtg-symbols/19.png" className={classes.mana} />
                    break;
                case "20": return <img src="/assets/img/mtg-symbols/20.png" className={classes.mana} />
                    break;
                case "G": return <img src="/assets/img/mtg-symbols/forrest.png" className={classes.mana} />
                    break;
                case "U": return <img src="/assets/img/mtg-symbols/island.png" className={classes.mana} />
                    break;
                case "W": return <img src="/assets/img/mtg-symbols/plains.png" className={classes.mana} />
                    break;
                case "B": return <img src="/assets/img/mtg-symbols/swamp.png" className={classes.mana} />
                    break;
                case "R": return <img src="/assets/img/mtg-symbols/mountain.png" className={classes.mana} />
                    break;
                case "X": return <img src="/assets/img/mtg-symbols/x.png" className={classes.mana} />
                    break;
                default: return character
            }
        })
    }


    return (
        <>
            {/* {props.cards.map(card => {
                return <Grid item xs={2} key={card._id}>
                <img src={card.imageUrl} width="100%" />
                </Grid>
            })} */}
            <Grid container justify="center">
                <Zoom in={true}>
                    <Grid item xs={10}>
                        <Paper className={classes.root}>

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Card Image</TableCell>
                                        <TableCell>Mana Cost</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Card Text</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.cards
                                        .slice(page * 5, page * 5 + 5).map(card => {
                                            return (
                                                <TableRow className={classes.row} key={card.id}>
                                                    <TableCell><img src={card.imageUrl} width="60px" onMouseOver={e => handleImagePopper(e)} onMouseLeave={e => handleImagePopper(e)} /></TableCell>
                                                    <TableCell><ReplaceMana mana={card.manaCost} manaClass={classes.mana} /></TableCell>
                                                    <TableCell><Typography variant="h6">{card.name}</Typography></TableCell>
                                                    <TableCell>{card.type}</TableCell>
                                                    <TableCell>{card.text}</TableCell>
                                                    <TableCell><Button color="primary" onClick={e => addCard(card.id)}><LibraryAdd color="primary" /></Button></TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[10]}
                                component="div"
                                count={count}
                                rowsPerPage={5}
                                page={page}
                                backIconButtonProps={{
                                    'aria-label': 'Previous Page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'Next Page',
                                }}
                                onChangePage={(e, pag) => setPage(pag)}
                                onChangeRowsPerPage={null}
                            />
                        </Paper>
                    </Grid>
                </Zoom>
                <Popper open={popperOpen} anchorEl={anchorEl} transition placement="left">
                    {/* {({ TransitionProps }) => ( */}
                    <Zoom in={popperOpen}>
                        <Paper>
                            <img src={popperImg} />
                        </Paper>
                    </Zoom>
                    {/* )} */}
                </Popper>
            </Grid>

        </>
    )
}

export default withStyles(styles)(SearchCards);