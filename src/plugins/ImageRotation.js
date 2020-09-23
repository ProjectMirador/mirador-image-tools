import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

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
