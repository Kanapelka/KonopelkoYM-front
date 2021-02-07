import React, {
  MouseEventHandler, useState, createRef, ChangeEvent,
} from 'react';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

import '../project-kanban.styles.sass';


interface TicketDialogTitleProps {
  ticketTitle?: string;
  onTicketNameSave: Function;
  onClose: MouseEventHandler;
}

function TicketDialogTitle({ ticketTitle, onTicketNameSave, onClose }: TicketDialogTitleProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [ticketTitleInner, setTicketName] = useState<string>(ticketTitle || 'New Ticket');

  const inputRef = createRef<HTMLInputElement>();

  function onCancel() {
    setEditMode(false);
    inputRef.current!.value = '';
  }

  function onSave() {
    setEditMode(false);
    onTicketNameSave(ticketTitleInner);
  }

  return (
    <DialogTitle>
      <div className="ticket-dialog-title">
        <div className="ticket-dialog-title-edit-name">
          <TextField
            inputRef={inputRef}
            className="ticket-dialog-title-text-field"
            InputProps={{ classes: { input: 'ticket-dialog-title-input' }, readOnly: !editMode }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTicketName(e.target.value)}
            defaultValue={ticketTitleInner}
          />
          {
            editMode
              ? (
                <>
                  <IconButton onClick={onSave}><DoneIcon /></IconButton>
                  <IconButton onClick={onCancel}><CloseIcon /></IconButton>
                </>
              )
              : <IconButton onClick={() => setEditMode(true)}><EditIcon /></IconButton>
          }
        </div>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </div>
    </DialogTitle>
  );
}

export default TicketDialogTitle;
