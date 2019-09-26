import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import Popper from '@material-ui/core/Popper';
import BrightnessIcon from '@material-ui/icons/Brightness5';
import TonalityIcon from '@material-ui/icons/Tonality';
import ContrastIcon from '@material-ui/icons/Camera';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import Slider from '@material-ui/core/Slider';

class ImageTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open || false,
      value: props.start
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { currentTarget } = e;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  }

  handleChange(e, val) {
    const { type } = this.props;
    this.setState({
      value: val
    })
    const docs = document.getElementsByClassName('openseadragon-canvas');
    const canvas = docs[0].getElementsByTagName('canvas')[0];
    const currentFilters = canvas.style.filter.split(' ');
    const newFilters = currentFilters.filter(filter => !filter.includes(type))
    newFilters.push(`${type}(${val}%)`);
    canvas.style.filter = newFilters.join(' ');
  }

  render() {
    const { children, label, type, min, max } = this.props;
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
              vertical="true"
              min={min}
              max={max}
              value={value}
              onChange={this.handleChange}
            />
          </div>
        </Popper>
      </Fragment>
    )
  }
}

ImageTool.defaultProps = {
  min: 0,
  max: 100,
  start: 100,
}

class MiradorImageTools extends Component {
  render() {
    const { TargetComponent } = this.props;
    return (
      <Fragment>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <div>
            <ImageTool
              type="brightness"
              label="Brightness"
              max={200}
            >
              <BrightnessIcon />
            </ImageTool>
            <ImageTool
              type="contrast"
              label="Contrast"
              max={200}
            >
              <ContrastIcon />
            </ImageTool>
            <ImageTool
              type="grayscale"
              label="Greyscale"
              start={0}
            >
              <TonalityIcon />
            </ImageTool>
            <ImageTool
              type="invert"
              label="Invert Colors"
              start={0}
            >
              <InvertColorsIcon />
            </ImageTool>
          </div>
        </div>
        <TargetComponent {...this.props.targetProps} />
      </Fragment>
    )
  }
}

export default {
  target: 'WindowCanvasNavigationControls',
  mode: 'wrap',
  component: MiradorImageTools,
}
