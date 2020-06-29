import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import RotateRightIcon from '@material-ui/icons/RotateRight';

export default class ImageRotation extends Component {
  render() {
    const { label, ...otherProps } = this.props;
    return (
      <MiradorMenuButton
        aria-label={label}
        {...otherProps}
      >
        <RotateRightIcon />
      </MiradorMenuButton>
    );
  }
}

ImageRotation.propTypes = {
  label: PropTypes.string.isRequired,
};
