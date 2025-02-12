import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import BrightnessIcon from '@mui/icons-material/Brightness5';
import TonalityIcon from '@mui/icons-material/Tonality';
import GradientIcon from '@mui/icons-material/Gradient';
import ContrastIcon from '@mui/icons-material/ExposureSharp';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import ReplaySharpIcon from '@mui/icons-material/ReplaySharp';
import { styled, alpha } from '@mui/material/styles';
import { useElementSize } from '@custom-react-hooks/use-element-size';
import mergeRefs from 'merge-refs';
import { MiradorMenuButton, useTranslation } from 'mirador';
import ImageTool from './ImageTool';
import ImageRotation from './ImageRotation';
import ImageFlip from './ImageFlip';

const SizeContainer = styled('div')(() => ({
  position: 'static !important',
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
    borderBottom: small ? border : 'none',
    borderImageSource: small ? borderImageBottom : borderImageRight,
    borderRadius: 25,
    display: 'flex',
    flexDirection: small ? 'column' : 'row',
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 999,
  };
});

const ControlContainer = styled('div')(({ small }) => ({
  border: 0,
  borderImageSlice: 1,
  display: 'flex',
  flexDirection: small ? 'column' : 'row',
}));

const MiradorImageTools = ({
  enabled = true,
  open = true,
  innerRef = null,
  updateViewport,
  updateWindow,
  viewer = {},
  viewConfig = {},
  windowId,
}) => {
  const [isSmallDisplay, setIsSmallDisplay] = useState(false);
  const { t } = useTranslation();

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
      brightness: 100,
      contrast: 100,
      flip: false,
      grayscale: 0,
      invert: 0,
      rotation: 0,
      saturate: 100,
    };
    updateViewport(windowId, viewConfigReset);
  };

  const applyFilters = useCallback(() => {
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
  }, [viewer, brightness, contrast, saturate, grayscale, invert]);

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

  const [sizeRef, size] = useElementSize();

  useEffect(() => {
    setIsSmallDisplay(size.width && size.width < 480);
  }, [size.width]);

  useEffect(() => {
    if (viewer) applyFilters();
  }, [applyFilters, viewer]);

  if (!viewer || !enabled) return <SizeContainer ref={mergeRefs(innerRef, sizeRef)} />;

  const toggleButton = (
    <div style={{ border: 0, borderImageSlice: 1 }}>
      <MiradorMenuButton
        aria-expanded={open}
        aria-haspopup
        aria-label={t('collapse', { context: open ? 'open' : 'close' })}
        onClick={toggleState}
      >
        {open ? <CloseSharpIcon /> : <TuneSharpIcon />}
      </MiradorMenuButton>
    </div>
  );

  return (
    <SizeContainer ref={mergeRefs(innerRef, sizeRef)}>
      <Root className="MuiPaper-elevation4" small={isSmallDisplay}>
        {isSmallDisplay && toggleButton}
        {open && (
          <>
            <ControlContainer small={isSmallDisplay}>
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
                flipped={flip}
                label={t('flip')}
                onClick={toggleFlip}
              />
            </ControlContainer>
            <ControlContainer small={isSmallDisplay}>
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
            </ControlContainer>
            <ControlContainer small={isSmallDisplay}>
              <MiradorMenuButton
                aria-label={t('revert')}
                onClick={handleReset}
              >
                <ReplaySharpIcon />
              </MiradorMenuButton>
            </ControlContainer>
          </>
        )}
        {!isSmallDisplay && toggleButton}
      </Root>
    </SizeContainer>
  );
};

MiradorImageTools.propTypes = {
  enabled: PropTypes.bool,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.any,
  ]),
  open: PropTypes.bool,
  updateViewport: PropTypes.func.isRequired,
  updateWindow: PropTypes.func.isRequired,
  viewConfig: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  viewer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
};

export const TestableImageTools = MiradorImageTools;

export default MiradorImageTools;
