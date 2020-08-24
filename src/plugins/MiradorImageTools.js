import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BrightnessIcon from '@material-ui/icons/Brightness5';
import TonalityIcon from '@material-ui/icons/Tonality';
import GradientIcon from '@material-ui/icons/Gradient';
import ContrastIcon from '@material-ui/icons/ExposureSharp';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import TuneSharpIcon from '@material-ui/icons/TuneSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import ReplaySharpIcon from '@material-ui/icons/ReplaySharp';
import { fade } from '@material-ui/core/styles/colorManipulator';
import withStyles from '@material-ui/core/styles/withStyles';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import ImageTool from './ImageTool';
import ImageRotation from './ImageRotation';
import ImageFlip from './ImageFlip';

/** Styles for withStyles HOC */
const styles = ({ breakpoints, palette }) => {
  console.log(palette);
  const backgroundColor = palette.shades.main;
  const foregroundColor = palette.getContrastText(backgroundColor);
  const border = `1px solid ${fade(foregroundColor, 0.2)}`;
  const borderImageRight = 'linear-gradient('
    + 'to bottom, '
    + `${fade(foregroundColor, 0)} 20%, `
    + `${fade(foregroundColor, 0.2)} 20% 80%, `
    + `${fade(foregroundColor, 0)} 80% )`;
  const borderImageBottom = borderImageRight.replace('to bottom', 'to right');
  return {
    root: {
      backgroundColor: fade(backgroundColor, 0.8),
      borderRadius: 25,
      position: 'absolute',
      top: 8,
      right: 8,
      zIndex: 999,
      display: 'flex',
      flexDirection: 'row',
      [breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    container: {
      border: 0,
      borderRight: border,
      borderImageSlice: 1,
      borderImageSource: borderImageRight,
      display: 'flex',
      flexDirection: 'row',
      [breakpoints.down('sm')]: {
        flexDirection: 'column',
        borderBottom: border,
        borderRight: 'none',
        borderImageSource: borderImageBottom,
      },
    },
  };
};

class MiradorImageTools extends Component {
  constructor(props) {
    super(props);
    this.toggleState = this.toggleState.bind(this);
    this.toggleRotate = this.toggleRotate.bind(this);
    this.toggleFlip = this.toggleFlip.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    const { viewer } = this.props;
    if (viewer) this.applyFilters();
  }

  componentDidUpdate(prevProps) {
    const { viewConfig, viewer } = this.props;
    if (viewer && viewConfig !== prevProps.viewConfig) this.applyFilters();
  }

  applyFilters() {
    const {
      viewConfig: {
        brightness = 100,
        contrast = 100,
        saturate = 100,
        grayscale = 0,
        invert = 0,
      },
      viewer: { canvas },
    } = this.props;

    if (!canvas) return;

    const controlledFilters = ['brightness', 'contrast', 'saturate', 'grayscale', 'invert'];

    const currentFilters = canvas.style.filter.split(' ');
    const newFilters = currentFilters.filter(
      (filter) => !controlledFilters.some((type) => filter.includes(type)),
    );
    newFilters.push(`brightness(${brightness}%)`);
    newFilters.push(`contrast(${contrast}%)`);
    newFilters.push(`saturate(${saturate}%)`);
    newFilters.push(`grayscale(${grayscale}%)`);
    newFilters.push(`invert(${invert}%)`);
    canvas.style.filter = newFilters.join(' ');
  }

  toggleState() {
    const { open, updateWindow, windowId } = this.props;

    updateWindow(windowId, { imageToolsOpen: !open });
  }

  toggleRotate(value) {
    const { updateViewport, viewConfig: { flip = false, rotation = 0 }, windowId } = this.props;

    const offset = flip ? -1 * value : value;

    updateViewport(windowId, { rotation: (rotation + offset) % 360 });
  }

  toggleFlip() {
    const { updateViewport, viewConfig: { flip = false }, windowId } = this.props;

    updateViewport(windowId, { flip: !flip });
  }

  handleChange(param) {
    const { updateViewport, windowId } = this.props;
    return (value) => updateViewport(windowId, { [param]: value });
  }

  handleReset() {
    const { updateViewport, windowId } = this.props;
    const viewConfig = {
      rotation: 0,
      flip: false,
      brightness: 100,
      contrast: 100,
      saturate: 100,
      grayscale: 0,
      invert: 0,
    };

    updateViewport(windowId, viewConfig);
  }

  render() {
    const {
      classes, enabled, open, viewer, windowId,
      theme: { palette },
      viewConfig: {
        flip = false,
        brightness = 100,
        contrast = 100,
        saturate = 100,
        grayscale = 0,
        invert = 0,
      },
    } = this.props;

    if (!viewer || !enabled) return null;

    const backgroundColor = palette.shades.main;
    const foregroundColor = palette.getContrastText(backgroundColor);

    return (
      <div className={`MuiPaper-elevation4 ${classes.root}`}>
        {open
        && (
        <React.Fragment>
          <div className={classes.container}>
            <ImageRotation
              label="Rotate right"
              onClick={() => this.toggleRotate(90)}
              variant="right"
            />
            <ImageRotation
              label="Rotate left"
              onClick={() => this.toggleRotate(-90)}
              variant="left"
            />
            <ImageFlip
              label="Flip"
              onClick={this.toggleFlip}
              flipped={flip}
            />
          </div>
          <div className={classes.container}>
            <ImageTool
              type="brightness"
              label="Brightness"
              max={200}
              windowId={windowId}
              value={brightness}
              foregroundColor={foregroundColor}
              onChange={this.handleChange('brightness')}
            >
              <BrightnessIcon />
            </ImageTool>
            <ImageTool
              type="contrast"
              label="Contrast"
              max={200}
              windowId={windowId}
              value={contrast}
              foregroundColor={foregroundColor}
              onChange={this.handleChange('contrast')}
            >
              <ContrastIcon style={{ transform: 'rotate(180deg)' }} />
            </ImageTool>
            <ImageTool
              type="saturate"
              label="Saturation"
              max={200}
              windowId={windowId}
              value={saturate}
              foregroundColor={foregroundColor}
              onChange={this.handleChange('saturate')}
            >
              <GradientIcon />
            </ImageTool>
            <ImageTool
              type="grayscale"
              variant="toggle"
              label="Greyscale"
              windowId={windowId}
              value={grayscale}
              backgroundColor={backgroundColor}
              foregroundColor={foregroundColor}
              onChange={this.handleChange('grayscale')}
            >
              <TonalityIcon />
            </ImageTool>
            <ImageTool
              type="invert"
              variant="toggle"
              label="Invert Colors"
              windowId={windowId}
              value={invert}
              foregroundColor={foregroundColor}
              onChange={this.handleChange('invert')}
            >
              <InvertColorsIcon />
            </ImageTool>
          </div>
          <div className={classes.container}>
            <MiradorMenuButton
              aria-label="Revert image"
              onClick={this.handleReset}
            >
              <ReplaySharpIcon />
            </MiradorMenuButton>
          </div>
        </React.Fragment>
        )}
        <MiradorMenuButton
          aria-label={open ? 'Collapse image tools' : 'Expand image tools'}
          onClick={this.toggleState}
        >
          { open ? <CloseSharpIcon /> : <TuneSharpIcon /> }
        </MiradorMenuButton>
      </div>
    );
  }
}

MiradorImageTools.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  enabled: PropTypes.bool,
  open: PropTypes.bool,
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  updateViewport: PropTypes.func.isRequired,
  updateWindow: PropTypes.func.isRequired,
  viewer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  viewConfig: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
};

MiradorImageTools.defaultProps = {
  enabled: true,
  open: true,
  viewer: undefined,
  viewConfig: {},
};

// Export without wrapping HOC for testing.
export const TestableImageTools = MiradorImageTools;

export default withStyles(styles)(MiradorImageTools);
