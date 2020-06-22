import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import Slider from '@material-ui/core/Slider';

export default class ImageTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      value: props.start,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      open: !state.open,
    }));
  }

  handleChange(e, val) {
    const { type, viewer } = this.props;
    this.setState({
      value: val,
    });
    const { canvas } = viewer;
    const currentFilters = canvas.style.filter.split(' ');
    const newFilters = currentFilters.filter((filter) => !filter.includes(type));
    newFilters.push(`${type}(${val}%)`);
    canvas.style.filter = newFilters.join(' ');
  }

  render() {
    const {
      children, label, min, max, type, windowId,
    } = this.props;
    const { value, open } = this.state;

    const id = `${windowId}-${type}`;

    return (
      <div style={{ display: 'inline-block' }}>
        <MiradorMenuButton
          id={`${id}-label`}
          aria-label={label}
          onClick={this.handleClick}
          aria-expanded={open}
          aria-controls={id}
          style={{ backgroundColor: open && 'rgba(0, 0, 0, 0.1)' }}
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
  open: PropTypes.bool,
  start: PropTypes.number,
  type: PropTypes.string.isRequired,
  viewer: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
};

ImageTool.defaultProps = {
  min: 0,
  max: 100,
  open: false,
  start: 100,
};
