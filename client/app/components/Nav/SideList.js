import React from 'react';

import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';

const SideList = props => {


    return (
        <div className={props.list}>
        <List>
          <Link to="/">
            <ListItem button key="home">
              <ListItemIcon><HomeOutlinedIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>

          <Link to="/deckbuilder">
            <ListItem button key="deckbuilder">
              <ListItemIcon><BuildOutlinedIcon /></ListItemIcon>
              <ListItemText primary="DeckBuilder" />
            </ListItem>
          </Link>

          {props.admin ? 
          <Link to="/admin">
            <ListItem button key="admin">
              <ListItemIcon><DashboardOutlinedIcon /></ListItemIcon>
              <ListItemText primary="Admin Panel" />
            </ListItem>
          </Link>: undefined}


        </List>
      </div>
    )
}

export default SideList;