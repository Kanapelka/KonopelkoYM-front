import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';

import { ButtonProps, ToolTipProps } from '../Props';


interface TooltipButtonProps extends ButtonProps, ToolTipProps{
  icon: React.ReactNode;
}

function TooltipButton({
  tooltip, onClick, icon, color,
}: TooltipButtonProps) {
  return (
    <Tooltip TransitionComponent={Zoom} title={tooltip}>
      <IconButton color={color} onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}

export default TooltipButton;
