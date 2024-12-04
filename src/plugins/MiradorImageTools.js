import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import compose from 'lodash/flowRight';
import { withSize } from 'mirador/dist/es/src/extend/withSize';
import { withRef } from 'mirador/dist/es/src/extend/withRef';
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
  border: 0,
  borderImageSlice: 1,
  display: 'flex',
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

const MiradorImageTools = (({
  enabled,
  innerRef,
  open,
  size,
  t,
  updateViewport,
  updateWindow,
  viewer,
  viewConfig,
  windowId,
}) => {
  const [isSmallDisplay, setIsSmallDisplay] = useState(false);

  const {
    flip = false,
    brightness = 100,
    contrast = 100,
    saturate = 100,
    grayscale = 0,
    invert = 0,
  } = viewConfig;

  const handleChange = (param) => (value) => {
    updateViewport(windowId, { [param]: value });
  };

  const handleReset = () => {
    const viewConfigReset = {
      rotation: 0,
      flip: false,
      brightness: 100,
      contrast: 100,
      saturate: 100,
      grayscale: 0,
      invert: 0,
    };
    updateViewport(windowId, viewConfigReset);
  };

  const applyFilters = () => {
    const { canvas } = viewer || {};
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
  };

  const toggleState = () => {
    updateWindow(windowId, { imageToolsOpen: !open });
  };

  const toggleRotate = (value) => {
    const offset = flip ? -1 * value : value;
    updateViewport(windowId, { rotation: (viewConfig.rotation + offset) % 360 });
  };

  const toggleFlip = () => {
    updateViewport(windowId, { flip: !flip });
  };

  useEffect(() => {
    setIsSmallDisplay(size.width && size.width < 480);
  }, [size.width]);

  useEffect(() => {
    if (viewer) applyFilters();
  }, [viewer, viewConfig]);

  if (!viewer || !enabled) return <SizeContainer ref={innerRef} />;

  const toggleButton = (
    <ToggleContainer>
      <MiradorMenuButton
        aria-expanded={open}
        aria-haspopup
        aria-label={t('collapse', { context: open ? 'open' : 'close' })}
        onClick={toggleState}
      >
        {open ? <CloseSharpIcon /> : <TuneSharpIcon />}
      </MiradorMenuButton>
    </ToggleContainer>
  );

  return (
    <SizeContainer ref={innerRef}>
      <Root className="MuiPaper-elevation4" small={isSmallDisplay}>
        {isSmallDisplay && toggleButton}
        {open && (
          <React.Fragment>
            <ToolContainer>
              <ImageRotation
                label={t('rotateRight')}
                onClick={() => toggleRotate(90)}
                variant="right"
              />
              <ImageRotation
                label={t('rotateLeft')}
                onClick={() => toggleRotate(-90)}
                variant="left"
              />
              <ImageFlip
                label={t('flip')}
                onClick={toggleFlip}
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
                onChange={handleChange('brightness')}
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
                onChange={handleChange('contrast')}
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
                onChange={handleChange('saturate')}
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
                onChange={handleChange('grayscale')}
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
                onChange={handleChange('invert')}
                small={isSmallDisplay}
              >
                <InvertColorsIcon />
              </ImageTool>
            </ToolContainer>
            <ToolContainer>
              <MiradorMenuButton
                aria-label={t('revert')}
                onClick={handleReset}
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
});

MiradorImageTools.propTypes = {
  enabled: PropTypes.bool,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.any,
  ]).isRequired,
  open: PropTypes.bool,
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
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
  viewer: undefined,
  viewConfig: {},
};

// Export without wrapping HOC for testing.
export const TestableImageTools = MiradorImageTools;

export default compose(withSize(), withRef())(MiradorImageTools);
