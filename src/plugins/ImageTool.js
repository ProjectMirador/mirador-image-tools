import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MiradorMenuButton from 'mirador/dist/es/src/containers/MiradorMenuButton';
import Slider from '@mui/material/Slider';
import { styled, alpha } from '@mui/material/styles';

const SliderContainer = styled('div')(({ small, theme: { palette } }) => ({
  backgroundColor: alpha(palette.shades.main, 0.8),
  borderRadius: 25,
  top: 48,
  marginTop: 2,
  position: 'absolute',
  height: 150,
  zIndex: 100,
  marginLeft: 2,
  padding: [[2, 7, 2, 7]],
  ...(small && {
    top: 'auto',
    right: 48,
    width: 150,
    height: 'auto',
    marginTop: -46,
    marginBottom: 2,
    padding: [[4, 2, 4, 2]],
  }),
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

class ImageTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { value, variant } = this.props;
    switch (variant) {
      case 'toggle':
        this.handleChange({}, value === 0 ? 100 : 0);
        break;
      default:
        this.setState((state) => ({
          open: !state.open,
        }));
    }
  }

  handleChange(e, val) {
    const { onChange } = this.props;
    onChange(val);
  }

  render() {
    const {
      children, label, max, min, value, type, variant, windowId, small,
    } = this.props;
    const { open } = this.state;

    const toggled = variant === 'toggle' && value > 0;

    const id = `${windowId}-${type}`;

    return (
      <div style={{ display: 'inline-block' }}>
        <ImageToolToggleButton
          id={`${id}-label`}
          aria-label={label}
          onClick={this.handleClick}
          aria-expanded={open}
          aria-controls={id}
          ownerState={{ toggled, open }}
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
            onChange={this.handleChange}
          />
        </SliderContainer>
        )}
      </div>
    );
  }
}

ImageTool.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  open: PropTypes.bool,
  small: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  variant: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

ImageTool.defaultProps = {
  min: 0,
  max: 100,
  open: false,
  small: false,
  variant: 'slider',
};

export default ImageTool;
