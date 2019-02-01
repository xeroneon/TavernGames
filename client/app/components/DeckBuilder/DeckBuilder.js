import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
}

class DeckBuilder extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        title: '',
        open: false
    }

    componentDidMount() {
        this.getDecks();
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleDialog = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    createDeck = event => {
        event.preventDefault();
        const body = {
            title: this.state.title
        }
        axios.post("/api/deck/create", body)
            .then(res => {
                if (res.data.success) {
                    this.getDecks();
                    this.handleClose();
                }
            })
    }

    getDecks = () => {
        axios.post("/api/deck/all")
            .then(res => {
                this.setState({
                    decks: res.data.decks
                })
            })
    }

    render() {
        return (
            <div style={{ flexGrow: 1 }}>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom style={{ padding: "20px" }}>
                            Magic: The Gathering
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justify="flex-start" spacing={8} style={{ padding: "20px" }}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            All Decks
                        </Typography>

                    </Grid>

                    <Grid item xs={6} md={2}>
                        <Paper
                            onClick={this.handleDialog}
                            id="newDeck"
                            style={
                                {
                                    backgroundColor: "#494949",
                                    borderRadius: "15px",
                                    height: "250px",
                                    width: "179px",
                                    lineHeight: "250px",
                                    textAlign: "center",
                                    fontSize: "70px",
                                    color: "#FFF"
                                }
                            }>
                            <AddCircleOutlinedIcon color="primary" style={{ fontSize: "50px" }} />
                        </Paper>
                    </Grid>

                    {this.state.decks ? this.state.decks.map(deck => {
                        return <Grid item xs={6} md={2} key={deck._id} style={{textAlign: "center"}}>
                            <img id="deck" src="/assets/img/mtg-card-back.png" style={{ borderRadius: "15px", height: "250px" }} />
                            <Typography variant="subtitle1" gutterBottom>
                                {deck.title}
                            </Typography>
                        </Grid>
                    }) : undefined}

                </Grid>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    scroll="body"
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Deck Name</DialogTitle>
                    <form>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Deck Name"
                                type="title"
                                name="title"
                                fullWidth
                                variant="outlined"
                                onChange={this.handleInputChange}
                                value={this.state.title}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={this.createDeck} color="primary" type="submit">
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(DeckBuilder);