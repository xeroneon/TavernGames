import React from 'react';
import axios from 'axios';
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
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


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
    isLoggedin: false,
    userImage: '',
    drawer: false,
    open: false,
    isSnackbarOpen: false,
    snackbarMessage: '',
    anchorEl: null,
    signup: false,
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  componentDidMount = () => {
    axios.get("/api/users/authenticate")
      .then(res => {
        console.log(res)

        if (res.data.authenticated) {
          this.setState({
            isLoggedin: true,
            userImage: res.data.user.photo
          })
        } else {
          this.setState({
            isLoggedin: false
          })
        }
      })
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

  handleSignUpToggle = () => {
    if (this.state.signup === true) {
      this.setState({
        signup: false
      })
    } else {
      this.setState({
        signup: true
      })
    }
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ isSnackbarOpen: false });
  };

  handleUserMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleUserMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.signup === true) {

      const newUser = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }
      axios.post("/api/users/signup", newUser)
        .then(res => {
          console.log("signed up")
          if (res.data.success) {
            this.setState({
              isLoggedin: true,
              open: false,
              isSnackbarOpen: true,
              snackbarMessage: res.data.message,
              email: '',
              username: '',
              password: '',
              firstName: '',
              lastName: ''
            })
          } else {

          }
        })
        .catch(err => console.log(err));
    } else {
      console.log("login");

      const returningUser = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      }
      axios.post("/api/users/login", returningUser)
        .then(res => {
          console.log("logged in")
          if (res.data.success) {
            this.setState({
              isLoggedin: true,
              userImage: res.data.user.photo,
              open: false,
              isSnackbarOpen: true,
              snackbarMessage: res.data.message,
              email: '',
              username: '',
              password: '',
              firstName: '',
              lastName: ''
            })
          } else {
            this.setState({
              isSnackbarOpen: true,
              snackbarMessage: res.data.message
            })
          }
        })
        .catch(err => console.log(err));

    }
  }

  handleLogout = () => {
    axios.get("/api/users/logout")
      .then(res => {
        if(res.data.loggedOut) {
          this.setState({
            isLoggedin: false,
            isSnackbarOpen: true,
            snackbarMessage: "Successful Logout"
          })
          this.handleUserMenuClose();
        }
      })
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
            {this.state.isLoggedin ? <Avatar aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true" onClick={this.handleUserMenuClick} alt="Remy Sharp" src={this.state.userImage} className={classes.bigAvatar} /> : <Button color="inherit" onClick={this.handleClickOpen}>Login</Button>}
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleUserMenuClose}
            >
              <MenuItem onClick={this.handleUserMenuClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleUserMenuClose}>My account</MenuItem>
              <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
            {/* <Button color="inherit" onClick={this.handleClickOpen}>Login</Button> */}
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
          scroll="body"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.state.signup ? "Sign Up" : "Login"}</DialogTitle>
          <form>
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
              <Button variant="outlined" onClick={this.handleSignUpToggle} color="primary">
                {this.state.signup ? "Login" : "Sign Up"}
              </Button>
              <Button variant="outlined" onClick={this.handleSubmit} color="primary" type="submit">
                Submit
            </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.isSnackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="primary"
              className={classes.close}
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);
