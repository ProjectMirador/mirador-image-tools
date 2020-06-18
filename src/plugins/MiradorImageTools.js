import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import BrightnessIcon from '@material-ui/icons/Brightness5';
import TonalityIcon from '@material-ui/icons/Tonality';
import GradientIcon from '@material-ui/icons/Gradient';
import ContrastIcon from '@material-ui/icons/Camera';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import TuneSharpIcon from '@material-ui/icons/TuneSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import ImageTool from './ImageTool';
import ImageRotation from './ImageRotation';

class MiradorImageTools extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
    };
    this.toggleState = this.toggleState.bind(this);
  }

  toggleState() {
    this.setState((state) => ({
      open: !state.open,
    }));
  }

  render() {
    const { TargetComponent, targetProps } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 25, position: 'absolute', top: 8, right: 8,
        }}
        >
          <div style={{
            border: 0,
            borderRight: '1px solid rgba(0, 0, 0, 0.2)',
            borderImageSlice: 1,
            borderImageSource: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.2) 20% 80%, rgba(0, 0, 0, 0) 80% )',
            display: open ? 'inline-block' : 'none',
          }}
          >
            <ImageRotation
              label="Rotate"
              windowId={targetProps.windowId}
            />
            <ImageTool
              type="brightness"
              label="Brightness"
              max={200}
              windowId={targetProps.windowId}
            >
              <BrightnessIcon />
            </ImageTool>
            <ImageTool
              type="contrast"
              label="Contrast"
              max={200}
              windowId={targetProps.windowId}
            >
              <ContrastIcon />
            </ImageTool>
            <ImageTool
              type="saturate"
              label="Saturation"
              max={200}
              windowId={targetProps.windowId}
            >
              <GradientIcon />
            </ImageTool>
            <ImageTool
              type="grayscale"
              label="Greyscale"
              start={0}
              windowId={targetProps.windowId}
            >
              <TonalityIcon />
            </ImageTool>
            <ImageTool
              type="invert"
              label="Invert Colors"
              start={0}
              windowId={targetProps.windowId}
            >
              <InvertColorsIcon />
            </ImageTool>
          </div>
          <MiradorMenuButton
            aria-label={open ? 'Hide image tools' : 'Show image tools'}
            onClick={this.toggleState}
          >
            { open ? <CloseSharpIcon /> : <TuneSharpIcon /> }
          </MiradorMenuButton>
        </div>
        <TargetComponent {...targetProps} />
      </Fragment>
    );
  }
}

MiradorImageTools.propTypes = {
  open: PropTypes.bool,
  TargetComponent: PropTypes.elementType.isRequired,
  targetProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

MiradorImageTools.defaultProps = {
  open: false,
};

export default MiradorImageTools;
