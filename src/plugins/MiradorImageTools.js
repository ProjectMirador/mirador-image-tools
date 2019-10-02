import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import BrightnessIcon from '@material-ui/icons/Brightness5';
import TonalityIcon from '@material-ui/icons/Tonality';
import ContrastIcon from '@material-ui/icons/Camera';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import ImageTool from './ImageTool';

class MiradorImageTools extends Component {
  render() {
    const { TargetComponent, targetProps } = this.props;
    return (
      <Fragment>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <div>
            <ImageTool
              type="brightness"
              label="Brightness"
              max={200}
            >
              <BrightnessIcon />
            </ImageTool>
            <ImageTool
              type="contrast"
              label="Contrast"
              max={200}
            >
              <ContrastIcon />
            </ImageTool>
            <ImageTool
              type="grayscale"
              label="Greyscale"
              start={0}
            >
              <TonalityIcon />
            </ImageTool>
            <ImageTool
              type="invert"
              label="Invert Colors"
              start={0}
            >
              <InvertColorsIcon />
            </ImageTool>
          </div>
        </div>
        <TargetComponent {...targetProps} />
      </Fragment>
    );
  }
}

MiradorImageTools.propTypes = {
  TargetComponent: PropTypes.elementType.isRequired,
  targetProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default MiradorImageTools;
