import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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

    render() {
        return (
            <div>
                DeckBuilder
            </div>
        )
    }
}

export default withStyles(styles)(DeckBuilder);