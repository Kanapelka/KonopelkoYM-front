import React from 'react';
import Typography from '@material-ui/core/Typography';

import '../../dahsboard-page.styles.sass';

interface EmptyCardTextProps {
  text?: string;
}

function EmptyCardText({ text }: EmptyCardTextProps) {
  return (
    <div className="empty-card-text-wrapper">
      <Typography className="empty-card-text" variant="h5">
        {text}
      </Typography>
    </div>
  );
}

export default EmptyCardText;
