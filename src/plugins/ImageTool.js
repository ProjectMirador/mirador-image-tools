import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import { OSDReferences } from 'mirador/dist/es/src/plugins/OSDReferences';
import Popper from '@material-ui/core/Popper';
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

  handleClick(e) {
    const { currentTarget } = e;
    this.setState((state) => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  }

  handleChange(e, val) {
    const { type, windowId } = this.props;
    this.setState({
      value: val,
    });
    const osdReference = OSDReferences.get(windowId).current;
    const { canvas } = osdReference.viewer;
    const currentFilters = canvas.style.filter.split(' ');
    const newFilters = currentFilters.filter((filter) => !filter.includes(type));
    newFilters.push(`${type}(${val}%)`);
    canvas.style.filter = newFilters.join(' ');
  }

  render() {
    const {
      children, label, min, max,
    } = this.props;
    const { value, open, anchorEl } = this.state;

    return (
      <Fragment>
        <MiradorMenuButton
          aria-label={label}
          onClick={this.handleClick}
        >
          {children}
        </MiradorMenuButton>
        <Popper open={open} anchorEl={anchorEl} placement="bottom" style={{ zIndex: 100 }}>
          <div style={{ height: '150px' }}>
            <Slider
              orientation="vertical"
              min={min}
              max={max}
              value={value}
              onChange={this.handleChange}
            />
          </div>
        </Popper>
      </Fragment>
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
  windowId: PropTypes.string.isRequired,
};

ImageTool.defaultProps = {
  min: 0,
  max: 100,
  open: false,
  start: 100,
};
