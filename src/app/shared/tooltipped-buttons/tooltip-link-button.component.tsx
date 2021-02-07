import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';

import { LinkProps, ToolTipProps, Color } from '../Props';


interface TooltipButtonProps extends LinkProps, ToolTipProps{
  icon: React.ReactNode;
  color?: Color;
}

function TooltipLinkButton({
  tooltip, link, icon, color,
}: TooltipButtonProps) {
  return (
    <Tooltip TransitionComponent={Zoom} title={tooltip}>
      <IconButton color={color} component={Link} to={link}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}

export default TooltipLinkButton;
