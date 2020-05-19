import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import { OSDReferences } from 'mirador/dist/es/src/plugins/OSDReferences';

export default class ImageRotation extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  osdViewport() {
    const { windowId } = this.props;
    return OSDReferences.get(windowId).current.viewer.viewport;
  }

  handleClick() {
    const currentRotation = this.osdViewport().getRotation();
    this.osdViewport().setRotation(currentRotation + 90);
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
  windowId: PropTypes.string.isRequired,
};
