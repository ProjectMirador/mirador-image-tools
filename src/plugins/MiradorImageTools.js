import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'lodash/flowRight';
import { withSize } from 'react-sizeme';
import BrightnessIcon from '@mui/icons-material/Brightness5';
import TonalityIcon from '@mui/icons-material/Tonality';
import GradientIcon from '@mui/icons-material/Gradient';
import ContrastIcon from '@mui/icons-material/ExposureSharp';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import ReplaySharpIcon from '@mui/icons-material/ReplaySharp';
import { styled, alpha } from '@mui/material/styles';
import MiradorMenuButton from 'mirador/dist/es/src/containers/MiradorMenuButton';
import ImageTool from './ImageTool';
import ImageRotation from './ImageRotation';
import ImageFlip from './ImageFlip';

const SizeContainer = styled('div')(() => ({
  position: 'static !important',
}));

const ToggleContainer = styled('div')(() => ({
  border: 0,
  borderImageSlice: 1,
}));

const ToolContainer = styled('div')(() => ({
  display: 'flex',
  border: 0,
  borderImageSlice: 1,
}));

/** Styles for withStyles HOC */
const Root = styled('div')(({ small, theme: { palette } }) => {
  const backgroundColor = palette.shades.main;
  const foregroundColor = palette.getContrastText(backgroundColor);
  const border = `1px solid ${alpha(foregroundColor, 0.2)}`;
  const borderImageRight = 'linear-gradient('
    + 'to bottom, '
    + `${alpha(foregroundColor, 0)} 20%, `
    + `${alpha(foregroundColor, 0.2)} 20% 80%, `
    + `${alpha(foregroundColor, 0)} 80% )`;
  const borderImageBottom = borderImageRight.replace('to bottom', 'to right');
  return {
    backgroundColor: alpha(backgroundColor, 0.8),
    borderRadius: 25,
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'row',
    ...(small && { flexDirection: 'column' }),
    [ToggleContainer]: {
      ...(small && {
        borderBottom: border,
        borderImageSource: borderImageBottom,
        display: 'flex',
      }),
    },
    [ToolContainer]: {
      ...(!small && {
        borderRight: border,
        borderImageSource: borderImageRight,
        flexDirection: 'row',
      }),
      ...(small && {
        flexDirection: 'column',
        borderBottom: border,
        borderImageSource: borderImageBottom,
      }),
    },
  };
});

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

  render() {
    const {
      enabled, open, viewer, windowId,
      viewConfig: {
        flip = false,
        brightness = 100,
        contrast = 100,
        saturate = 100,
        grayscale = 0,
        invert = 0,
      }, size: { width },
      t,
    } = this.props;

    if (!viewer || !enabled) return null;

    const isSmallDisplay = width && (width < 480);

    /** Button for toggling the menu */
    const toggleButton = (
      <ToggleContainer>
        <MiradorMenuButton
          aria-expanded={open}
          aria-haspopup
          aria-label={t('collapse', { context: open ? 'open' : 'close' })}
          onClick={this.toggleState}
        >
          { open ? <CloseSharpIcon /> : <TuneSharpIcon /> }
        </MiradorMenuButton>
      </ToggleContainer>
    );
    return (
      <SizeContainer>
        <Root className="MuiPaper-elevation4" small={isSmallDisplay}>
          {isSmallDisplay && toggleButton}
          {open
          && (
          <React.Fragment>
            <ToolContainer>
              <ImageRotation
                label={t('rotateRight')}
                onClick={() => this.toggleRotate(90)}
                variant="right"
              />
              <ImageRotation
                label={t('rotateLeft')}
                onClick={() => this.toggleRotate(-90)}
                variant="left"
              />
              <ImageFlip
                label={t('flip')}
                onClick={this.toggleFlip}
                flipped={flip}
              />
            </ToolContainer>
            <ToolContainer>
              <ImageTool
                type="brightness"
                label={t('brightness')}
                max={200}
                windowId={windowId}
                value={brightness}
                onChange={this.handleChange('brightness')}
                small={isSmallDisplay}
              >
                <BrightnessIcon />
              </ImageTool>
              <ImageTool
                type="contrast"
                label={t('contrast')}
                max={200}
                windowId={windowId}
                value={contrast}
                onChange={this.handleChange('contrast')}
                small={isSmallDisplay}
              >
                <ContrastIcon style={{ transform: 'rotate(180deg)' }} />
              </ImageTool>
              <ImageTool
                type="saturate"
                label={t('saturation')}
                max={200}
                windowId={windowId}
                value={saturate}
                onChange={this.handleChange('saturate')}
                small={isSmallDisplay}
              >
                <GradientIcon />
              </ImageTool>
              <ImageTool
                type="grayscale"
                variant="toggle"
                label={t('greyscale')}
                windowId={windowId}
                value={grayscale}
                onChange={this.handleChange('grayscale')}
                small={isSmallDisplay}
              >
                <TonalityIcon />
              </ImageTool>
              <ImageTool
                type="invert"
                variant="toggle"
                label={t('invert')}
                windowId={windowId}
                value={invert}
                onChange={this.handleChange('invert')}
                small={isSmallDisplay}
              >
                <InvertColorsIcon />
              </ImageTool>
            </ToolContainer>
            <ToolContainer>
              <MiradorMenuButton
                aria-label={t('revert')}
                onClick={this.handleReset}
              >
                <ReplaySharpIcon />
              </MiradorMenuButton>
            </ToolContainer>
          </React.Fragment>
          )}
          {!isSmallDisplay && toggleButton}
        </Root>
      </SizeContainer>
    );
  }
}

MiradorImageTools.propTypes = {
  enabled: PropTypes.bool,
  open: PropTypes.bool,
  size: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func.isRequired,
  updateViewport: PropTypes.func.isRequired,
  updateWindow: PropTypes.func.isRequired,
  viewer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  viewConfig: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
};

MiradorImageTools.defaultProps = {
  enabled: true,
  open: true,
  size: {},
  viewer: undefined,
  viewConfig: {},
};

// Export without wrapping HOC for testing.
export const TestableImageTools = MiradorImageTools;

export default compose(withSize())(MiradorImageTools);
