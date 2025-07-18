import { useState } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador';
import Slider from '@mui/material/Slider';
import { styled, alpha } from '@mui/material/styles';

const SliderContainer = styled('div')(({ small, theme: { palette } }) => ({
  backgroundColor: alpha(palette.shades.main, 0.8),
  borderRadius: 25,
  height: 150,
  marginLeft: 2,
  marginTop: 2,
  padding: [[2, 7, 2, 7]],
  position: 'absolute',
  ...(small && {
    height: 'auto',
    marginBottom: 2,
    marginTop: -46,
    padding: [[4, 2, 4, 2]],
    right: 48,
    top: 'auto',
    width: 150,
  }),
  top: 48,
  zIndex: 100,
}));

const ImageToolToggleButton = styled(MiradorMenuButton)(({
  theme: { palette },
  ownerState: { open, toggled },
}) => ({
  ...(toggled && {
    backgroundColor: `${alpha(palette.getContrastText(palette.shades.main), 0.25)} !important`,
  }),
  ...(open && {
    backgroundColor: `${alpha(palette.getContrastText(palette.shades.main), 0.1)} !important`,
  }),
}));

const ImageTool = ({
  children, label, max = 100, min = 0, value, type, variant = 'slider', windowId, small = false, onChange,
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    switch (variant) {
      case 'toggle':
        onChange(value === 0 ? 100 : 0);
        break;
      default:
        setOpen((prevState) => !prevState);
    }
  };

  const toggled = variant === 'toggle' && value > 0;
  const id = `${windowId}-${type}`;

  return (
    <div style={{ display: 'inline-block' }}>
      <ImageToolToggleButton
        id={`${id}-label`}
        aria-label={label}
        onClick={handleClick}
        aria-expanded={open}
        aria-controls={id}
        ownerState={{ open, toggled }}
      >
        {children}
      </ImageToolToggleButton>

      {open && (
        <SliderContainer
          id={id}
          aria-labelledby={`${id}-label`}
          className="MuiPaper-elevation4"
          small={small}
        >
          <Slider
            orientation={small ? 'horizontal' : 'vertical'}
            min={min}
            max={max}
            value={value}
            onChange={(e, val) => onChange(val)}
          />
        </SliderContainer>
      )}
    </div>
  );
};

ImageTool.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  small: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  variant: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

export default ImageTool;
