import React, { Component } from 'react';
import compose from 'lodash/flowRight';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import Slider from '@material-ui/core/Slider';
import withStyles from '@material-ui/core/styles/withStyles';
import withWidth from '@material-ui/core/withWidth';
import { fade } from '@material-ui/core/styles/colorManipulator';

/** Styles for withStyles HOC */
const styles = ({ palette, breakpoints }) => ({
  slider: {
    backgroundColor: fade(palette.shades.main, 0.8),
    borderRadius: 25,
    padding: 8,
    top: 48,
    marginTop: 2,
    position: 'absolute',
    height: '150px',
    zIndex: 100,
    [breakpoints.down('sm')]: {
      top: 'auto',
      right: 48,
      width: '150px',
      height: 'auto',
      marginTop: -46,
    },
  },
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
      children, label, max, min, value, type, variant, windowId,
      foregroundColor, classes, width,
    } = this.props;
    const { open } = this.state;

    const toggled = variant === 'toggle' && value > 0;

    const id = `${windowId}-${type}`;

    let bubbleBg;
    if (open || toggled) {
      bubbleBg = fade(foregroundColor, open ? 0.1 : 0.25);
    }

    return (
      <div style={{ display: 'inline-block' }}>
        <MiradorMenuButton
          id={`${id}-label`}
          aria-label={label}
          onClick={this.handleClick}
          aria-expanded={open}
          aria-controls={id}
          style={{ backgroundColor: bubbleBg }}
        >
          {children}
        </MiradorMenuButton>

        {open && (
        <div
          id={id}
          aria-labelledby={`${id}-label`}
          className={`MuiPaper-elevation4 ${classes.slider}`}
        >
          <Slider
            orientation={width === 'sm' ? 'horizontal' : 'vertical'}
            min={min}
            max={max}
            value={value}
            onChange={this.handleChange}
          />
        </div>
        )}
      </div>
    );
  }
}

ImageTool.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  foregroundColor: PropTypes.string,
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
  foregroundColor: 'rgb(0, 0, 0)',
  min: 0,
  max: 100,
  open: false,
  variant: 'slider',
};

export default compose(withStyles(styles), withWidth())(ImageTool);
