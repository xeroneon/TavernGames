import React, { useContext, useEffect, useState} from 'react';
import { ModalContext, UserContext, SnackbarContext } from "../../globalState";
import SideList from "./SideList"

import { Link } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
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

const Nav = props => {
  const { classes } = props;

  const {username, userImage, setUserImage, loggedIn, setLoggedIn, admin, setAdmin } = useContext(UserContext);
  const {snackbar, setSnackbar, snackbarMessage, setSnackbarMessage } = useContext(SnackbarContext);
  const {open, setOpen} = useContext(ModalContext);

  const [drawer, setDrawer ] = useState(false);
  const [anchorEl, setAnchorEl ] = useState(null);

  useEffect(() => {
    axios.get("/api/users/authenticate")
      .then(res => {
        console.log(res)

        if (res.data.authenticated) {
          res.data.user.role > 1 ? setAdmin(true) : setAdmin(false);
          setLoggedIn(true);
          setUserImage(res.data.user.photo);
        } else {
          setLoggedIn(false)
        }
      })
  },[])

  const toggleDrawer = () => {
    if (!drawer) {
      setDrawer(true)
    }
    else {
      setDrawer(false)
    }
  }

  const openModal = () => {
    setOpen(true)
  };

  const userMenuOpen = event => {
    // this.setState({ anchorEl: event.currentTarget });
    console.log(event)
    setAnchorEl(event.currentTarget)
  };

  const userMenuClose = () => {
    // this.setState({ anchorEl: null });
    setAnchorEl(null);
  };



  const logout = () => {
    axios.get("/api/users/logout")
      .then(res => {
        if (res.data.loggedOut) {
          setLoggedIn(false);
          setSnackbar(true);
          setSnackbarMessage("Successful Logout")
          userMenuClose();
        }
      })
  }
    
    return (

      <div className={classes.root}>
        <AppBar position="static" className={classes.AppBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={e => toggleDrawer()}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Tavern Games
            </Typography>
            {loggedIn ? <Avatar aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true" onClick={e => userMenuOpen(e)} alt="Remy Sharp" src={userImage} className={classes.bigAvatar} /> : <Button color="primary" onClick={openModal}>Login / Sign Up</Button>}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={e => userMenuClose(e)}
            >
              <MenuItem onClick={e => userMenuClose(e)}>Profile</MenuItem>
              <MenuItem onClick={e => userMenuClose(e)}>My account</MenuItem>
              <MenuItem onClick={e => logout()}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer open={drawer} onClose={e => toggleDrawer()}>
          <div
            tabIndex={0}
            role="button"
            onClick={e => toggleDrawer()}
            onKeyDown={e => toggleDrawer()}
          >
            {<SideList list={classes.list} admin={admin} />}
          </div>
        </Drawer>
      </div>
    );
  }

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);
