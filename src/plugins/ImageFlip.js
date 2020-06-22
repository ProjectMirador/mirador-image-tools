import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

export default class ImageFlip extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { flipped: null };
  }

  componentDidMount() {
    const { viewer } = this.props;
    this.setState({ flipped: viewer.viewport.getFlip() });
  }

  handleClick() {
    const { viewer } = this.props;

    viewer.viewport.toggleFlip();
    this.setState({ flipped: viewer.viewport.getFlip() });
  }

  render() {
    const { label } = this.props;
    const { flipped } = this.state;

    return (
      <MiradorMenuButton
        aria-label={label}
        onClick={this.handleClick}
        style={{ backgroundColor: flipped && 'rgba(0, 0, 0, 0.25)' }}
      >
        <SwapHorizIcon style={{ color: flipped && '#fff' }} />
      </MiradorMenuButton>
    );
  }
}

ImageFlip.propTypes = {
  label: PropTypes.string.isRequired,
  viewer: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
