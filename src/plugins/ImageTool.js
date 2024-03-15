import React, { Component } from 'react';
import { styled, alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import MiradorMenuButton from 'mirador/dist/es/src/containers/MiradorMenuButton';
import Slider from '@mui/material/Slider';

const PREFIX = 'ImageTool';

const styledClasses = {
  slider: `${PREFIX}-slider`,
};

const Root = styled('div')(({
  theme: { palette, breakpoints },
  size,
  variant,
}) => {
  const backgroundColor = palette.shades.main;
  const foregroundColor = palette.getContrastText(backgroundColor);

  return {
    '& button': {
      ...(variant == 'toggled' && { backgroundColor: alpha(foregroundColor, 0.25) }),
      ...(variant == 'open' && { backgroundColor: alpha(foregroundColor, 0.1) })
    },
    [`& .${styledClasses.slider}`]: {
      backgroundColor: alpha(palette.shades.main, 0.8),
      borderRadius: 25,
      top: 48,
      marginTop: 2,
      position: 'absolute',
      height: 150,
      zIndex: 100,
      marginLeft: 2,
      padding: [[2, 7, 2, 7]],
      ...(size == 'sm' && {
        top: 'auto',
        right: 48,
        width: 150,
        height: 'auto',
        marginTop: -46,
        marginBottom: 2,
        padding: [[4, 2, 4, 2]],
      }),
    }
  }
});
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
      children, label, max, min, value, type, variant, windowId, width,
    } = this.props;
    const { open } = this.state;

    const toggled = variant === 'toggle' && value > 0;

    const id = `${windowId}-${type}`;

    return (
      <Root style={{ display: 'inline-block' }} size={width} variant={(toggled ? 'toggled' : open ? 'open' : undefined)}>
        <MiradorMenuButton
          id={`${id}-label`}
          aria-label={label}
          onClick={this.handleClick}
          aria-expanded={open}
          aria-controls={id}
        >
          {children}
        </MiradorMenuButton>

        {open && (
        <div
          id={id}
          aria-labelledby={`${id}-label`}
          className={`MuiPaper-elevation4 ImageTool-slider`}
        >
          <Slider
            orientation={['xs', 'sm'].indexOf(width) >= 0 ? 'horizontal' : 'vertical'}
            min={min}
            max={max}
            value={value}
            onChange={this.handleChange}
          />
        </div>
        )}
      </Root>
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
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  variant: PropTypes.string,
  windowId: PropTypes.string.isRequired,
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

ImageTool.defaultProps = {
  min: 0,
  max: 100,
  open: false,
  variant: 'slider',
};

export default ImageTool;
