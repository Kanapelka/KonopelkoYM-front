import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';

import { IContainerProps } from '../Props';


interface ElevatedPaperProps extends IContainerProps{
  defaultElevation: number,
  onHoverElevation: number,
}

function ElevatedPaper({
  className, children, defaultElevation, onHoverElevation,
}: ElevatedPaperProps) {
  const [elevation, setElevation] = useState<number>(defaultElevation);

  const upPaper = () => { setElevation(onHoverElevation); };
  const downPaper = () => { setElevation(defaultElevation); };

  return (
    <Paper
      className={className}
      elevation={elevation}
      onMouseMove={upPaper}
      onMouseLeave={downPaper}
    >
      {children}
    </Paper>
  );
}

export default ElevatedPaper;
