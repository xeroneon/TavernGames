import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SideNav from "../SideNav/SideNav"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import BuildIcon from '@material-ui/icons/Build';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  AppBar: {
    background: "#333"
  },
  list: {
    width: 250,
  }
};

class Nav extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    drawer: false,
    open: false,
    signup: false,
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  toggleDrawer = () => {
    if (this.state.drawer === false) {
      this.setState({
        drawer: true
      });
    }
    else {
      this.setState({
        drawer: false
      })
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSignUp = () => {
    if(this.state.signup === true) {
      this.setState({
        signup: false
      })
    } else {
      this.setState({
        signup: true
      })
    }
  }

  handleLogin = () => {
    if(this.state.signup === true) {
      this.setState({
        signup: false
      })
    } else {
      console.log("login");
    }
  }

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>

          <ListItem button key="deckbuilder">
            <ListItemIcon><BuildIcon /></ListItemIcon>
            <ListItemText primary="DeckBuilder" />
          </ListItem>

        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.AppBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Tavern Games
            </Typography>
            <Button color="inherit" onClick={this.handleClickOpen}>Login</Button>
          </Toolbar>
        </AppBar>
        {/* <SideNav open={this.state.drawer} /> */}
        <Drawer open={this.state.drawer} onClose={this.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            {sideList}
          </div>
        </Drawer>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{ this.state.signup ? "Sign Up" : "Login"}</DialogTitle>
          <DialogContent>
            {this.state.signup ? <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="username"
              name="username"
              fullWidth
              variant="outlined"
              onChange={this.handleInputChange}
              value={this.state.username}
            /> : <div></div>}
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label={this.state.signup ? "Email Address" : "Username / Email Address"}
              type="email"
              name="email"
              fullWidth
              variant="outlined"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              name="password"
              fullWidth
              variant="outlined"
              onChange={this.handleInputChange}
              value={this.state.password}
            />

            {this.state.signup ? <TextField
              margin="dense"
              id="firstName"
              label="First Name"
              type="firstName"
              name="firstName"
              fullWidth
              variant="outlined"
              onChange={this.handleInputChange}
              value={this.state.firstName}
            /> : <div></div>}

            {this.state.signup ? <TextField
              margin="dense"
              id="lastName"
              label="Last Name"
              type="lastName"
              name="lastName"
              fullWidth
              variant="outlined"
              onChange={this.handleInputChange}
              value={this.state.lastName}
            /> : <div></div>}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSignUp} color="primary">
              {this.state.signup ? "Login" : "Sign Up"}
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);
