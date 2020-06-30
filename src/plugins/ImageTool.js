import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import Slider from '@material-ui/core/Slider';

export default class ImageTool extends Component {
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
      children, label, max, min, value, type, variant, windowId,
    } = this.props;
    const { open } = this.state;

    const toggled = variant === 'toggle' && value > 0;

    const id = `${windowId}-${type}`;

    return (
      <div style={{ display: 'inline-block' }}>
        <MiradorMenuButton
          id={`${id}-label`}
          aria-label={label}
          onClick={this.handleClick}
          aria-expanded={open}
          aria-controls={id}
          style={{ backgroundColor: (open && 'rgba(0, 0, 0, 0.1)') || (toggled && 'rgba(0, 0, 0, 0.25)') }}
        >
          {children}
        </MiradorMenuButton>

        <div
          id={id}
          aria-labelledby={`${id}-label`}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 25, padding: 8, top: 48, marginTop: 2, position: 'absolute', display: open ? 'block' : 'none', height: '150px', zIndex: 100,
          }}
        >
          <Slider
            orientation="vertical"
            min={min}
            max={max}
            value={value}
            onChange={this.handleChange}
          />
        </div>
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
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  variant: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

ImageTool.defaultProps = {
  min: 0,
  max: 100,
  open: false,
  variant: 'slider',
};
