import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

export default class ImageRotation extends Component {
  render() {
    const { label, variant, ...otherProps } = this.props;
    return (
      <MiradorMenuButton
        aria-label={label}
        {...otherProps}
      >
        { variant === 'left' ? <RotateLeftIcon /> : <RotateRightIcon /> }
      </MiradorMenuButton>
    );
  }
}

ImageRotation.propTypes = {
  containerId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};
