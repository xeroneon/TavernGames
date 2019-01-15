import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styles = {
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  };


class SideNav extends React.Component {

  constructor(props) {
    super(props);
  }

    state = {
        open: this.props.open
    }

    componentDidMount() {
      this.setState({
        open: this.props.open
      })
    }

    toggleDrawer = (open) => () => {
        this.setState({
          open: open,
        });
      };

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

        return(
        <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer(false)}
                    onKeyDown={this.toggleDrawer(false)}
                  >
                    {sideList}
                  </div>
                </Drawer>

        );

    }

};

export default withStyles(styles)(SideNav);