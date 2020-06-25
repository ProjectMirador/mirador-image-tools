import React, { Component } from 'react';
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
import ImageFlip from './ImageFlip';

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
    const { viewer, windowId } = this.props;
    const { open } = this.state;

    if (!viewer) return null;

    return (
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 25,
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 999,
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
            windowId={windowId}
            viewer={viewer}
          />
          <ImageFlip
            label="Flip"
            windowId={windowId}
            viewer={viewer}
          />
        </div>
        <div style={{
          border: 0,
          borderRight: '1px solid rgba(0, 0, 0, 0.2)',
          borderImageSlice: 1,
          borderImageSource: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.2) 20% 80%, rgba(0, 0, 0, 0) 80% )',
          display: open ? 'inline-block' : 'none',
        }}
        >
          <ImageTool
            type="brightness"
            label="Brightness"
            max={200}
            windowId={windowId}
            viewer={viewer}
          >
            <BrightnessIcon />
          </ImageTool>
          <ImageTool
            type="contrast"
            label="Contrast"
            max={200}
            windowId={windowId}
            viewer={viewer}
          >
            <ContrastIcon />
          </ImageTool>
          <ImageTool
            type="saturate"
            label="Saturation"
            max={200}
            windowId={windowId}
            viewer={viewer}
          >
            <GradientIcon />
          </ImageTool>
          <ImageTool
            type="grayscale"
            variant="toggle"
            label="Greyscale"
            start={0}
            windowId={windowId}
            viewer={viewer}
          >
            <TonalityIcon />
          </ImageTool>
          <ImageTool
            type="invert"
            variant="toggle"
            label="Invert Colors"
            start={0}
            windowId={windowId}
            viewer={viewer}
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
    );
  }
}

MiradorImageTools.propTypes = {
  open: PropTypes.bool,
  viewer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
};

MiradorImageTools.defaultProps = {
  open: false,
  viewer: undefined,
};

export default MiradorImageTools;
