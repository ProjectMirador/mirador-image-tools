import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { alpha } from '@mui/material/styles';

export default class ImageFlip extends Component {
  render() {
    const {
      flipped, label, backgroundColor, foregroundColor, ...otherProps
    } = this.props;

    return (
      <MiradorMenuButton
        aria-label={label}
        style={{ backgroundColor: flipped && alpha(foregroundColor, 0.25) }}
        {...otherProps}
      >
        <SwapHorizIcon style={{ color: flipped && backgroundColor }} />
      </MiradorMenuButton>
    );
  }
}

ImageFlip.propTypes = {
  backgroundColor: PropTypes.string,
  flipped: PropTypes.bool.isRequired,
  foregroundColor: PropTypes.string,
  label: PropTypes.string.isRequired,
};

ImageFlip.defaultProps = {
  backgroundColor: 'rgb(255, 255, 255)',
  foregroundColor: 'rgb(0, 0, 0)',
};
