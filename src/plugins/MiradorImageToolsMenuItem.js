import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TuneSharpIcon from '@material-ui/icons/TuneSharp';

const MiradorImageToolsMenuItem = ({
  enabled, handleClose, updateWindow, windowId,
}) => {
  const handleClickOpen = () => {
    handleClose();
    updateWindow(windowId, { imageToolsEnabled: !enabled });
  };

  return (
    <MenuItem onClick={handleClickOpen}>
      <ListItemIcon>
        <TuneSharpIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ variant: 'body1' }}>
        { enabled ? 'Hide image tools' : 'Show image tools' }
      </ListItemText>
    </MenuItem>
  );
};

MiradorImageToolsMenuItem.propTypes = {
  enabled: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  updateWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

export default MiradorImageToolsMenuItem;
