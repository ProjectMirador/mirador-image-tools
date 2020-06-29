import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

export default class ImageFlip extends Component {
  render() {
    const { flipped, label, ...otherProps } = this.props;

    return (
      <MiradorMenuButton
        aria-label={label}
        style={{ backgroundColor: flipped && 'rgba(0, 0, 0, 0.25)' }}
        {...otherProps}
      >
        <SwapHorizIcon style={{ color: flipped && '#fff' }} />
      </MiradorMenuButton>
    );
  }
}

ImageFlip.propTypes = {
  flipped: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};
