import React, { MouseEventHandler } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


interface SnackBarAlertProps {
  open?: boolean;
  message?: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  onClose: MouseEventHandler<HTMLElement>;
}

function SnackBarAlert({
  open, message, severity, onClose,
}: SnackBarAlertProps) {
  const closeIcon = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  function handleClose(event: any) {
    onClose(event);
  }

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        elevation={5}
        variant="filled"
        severity={severity}
        action={closeIcon}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackBarAlert;
