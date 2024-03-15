import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { alpha } from '@material-ui/core/styles';

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
  containerId: PropTypes.string.isRequired,
  foregroundColor: PropTypes.string,
  flipped: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

ImageFlip.defaultProps = {
  backgroundColor: 'rgb(255, 255, 255)',
  foregroundColor: 'rgb(0, 0, 0)',
};
