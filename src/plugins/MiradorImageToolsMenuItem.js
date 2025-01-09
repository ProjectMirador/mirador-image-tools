import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TuneSharpIcon from '@mui/icons-material/TuneSharp';

const MiradorImageToolsMenuItem = ({
  enabled = true,
  handleClose,
  t,
  updateWindow,
  windowId,
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
        { enabled ? t('hide') : t('show') }
      </ListItemText>
    </MenuItem>
  );
};

MiradorImageToolsMenuItem.propTypes = {
  enabled: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  updateWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

export default MiradorImageToolsMenuItem;
