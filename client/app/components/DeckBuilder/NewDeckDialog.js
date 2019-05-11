import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    }
}

const NewDeckDialog = props => {
    const { classes } = props

    const handleClose = () => {
        if (props.open) {
            setOpen(false)
        }
    };


    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
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
                            onChange={e => props.setTitle(e.target.value)}
                            value={props.title}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={props.createDeck} color="primary" type="submit">
                            Submit
                            </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default withStyles(styles)(NewDeckDialog);