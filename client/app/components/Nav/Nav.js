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
import MailIcon from '@material-ui/icons/Mail';


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
  },
};

class Nav extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    drawer: false
  }

  toggleDrawer = () => {
    if( this.state.drawer === false) {
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

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.AppBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Tavern Games
            </Typography>
            <Button color="inherit">Login</Button>
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
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);
