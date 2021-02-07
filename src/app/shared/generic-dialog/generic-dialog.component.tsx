import React, { MouseEventHandler } from 'react';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { IContainerProps } from '../Props';


interface GenericDialogProps extends IContainerProps {
  opened: boolean;
  title: string;
  confirmText: string,
  onConfirm: MouseEventHandler;
  onClose: MouseEventHandler;
  confirmButtonSeverity?: 'danger' | 'common';
  disableConfirm?: boolean,
}

function GenericDialog({
  opened, title, className, children, confirmText, onConfirm, onClose, confirmButtonSeverity, disableConfirm,
}: GenericDialogProps) {
  let color: 'secondary' | 'primary' | 'inherit' | 'default' | undefined;
  if (confirmButtonSeverity === 'danger') {
    color = 'secondary';
  } else {
    color = 'primary';
  }

  return (
    <Dialog TransitionComponent={Zoom} className={className} open={opened} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">Отмена</Button>
        <Button disabled={disableConfirm} onClick={onConfirm} variant="contained" color={color}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default GenericDialog;
