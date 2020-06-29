import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import RotateRightIcon from '@material-ui/icons/RotateRight';

export default class ImageRotation extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { viewer } = this.props;

    const currentRotation = viewer.viewport.getRotation();
    const flipped = viewer.viewport.getFlip();
    const offset = flipped ? -90 : 90;
    viewer.viewport.setRotation((currentRotation + offset) % 360);
  }

  render() {
    const { label } = this.props;
    return (
      <MiradorMenuButton
        aria-label={label}
        onClick={this.handleClick}
      >
        <RotateRightIcon />
      </MiradorMenuButton>
    );
  }
}

ImageRotation.propTypes = {
  label: PropTypes.string.isRequired,
  viewer: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
