import React, { ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import TicketDialog from './ticket-dialog/ticket-dialog.component';

import TicketsStack from './tickets-stack.component';
import TicketStatus from '../shared/models/TicketStatus';
import TicketThumbnailModel from '../shared/models/TicketThumbnailModel';

import './project-kanban.styles.sass';
import ProjectMember from '../shared/models/ProjectMember';


interface BoardProps {
  statuses: TicketStatus[],
  tickets: TicketThumbnailModel[];
  members: ProjectMember[];
  onAddStatus: Function;
  projectId: number;
  reload: Function;
  onRemoveStatus: Function;
}

type State = {
  editMode: boolean;
  newStatusName: string;
  openDialog: boolean;
  currentTicketId?: number;
  currentCategoryId?: number;
};

function Board({
  tickets, statuses, onAddStatus, members, projectId, reload, onRemoveStatus,
}: BoardProps) {
  const [state, setState] = useState<State>({ editMode: false, newStatusName: '', openDialog: false });

  const add = () => {
    state.editMode = true; setState({ ...state });
  };
  const cancel = () => {
    state.editMode = false;
    state.newStatusName = '';
    setState({ ...state });
  };

  function onAddStatusInner() {
    onAddStatus(state.newStatusName);
    cancel();
  }

  function onAddNewClick(statusId: number) {
    state.currentCategoryId = statusId;
    state.openDialog = true;
    setState({ ...state });
  }

  function onDialogClose() {
    state.openDialog = false;
    state.currentCategoryId = undefined;
    state.currentTicketId = undefined;
    setState({ ...state });
    reload();
  }

  function onTicketClick(ticketId: number) {
    state.openDialog = true;
    state.currentTicketId = ticketId;
    // @ts-ignore
    state.currentCategoryId = tickets!.find((t) => (t!.ticketId === ticketId)).statusId;
    setState({ ...state });
  }

  function onStatusNameChange(event: ChangeEvent<HTMLInputElement>) {
    state.newStatusName = event.target.value;
    setState({ ...state });
  }

  const addButton = (
    <Button onClick={add} color="primary" variant="contained" className="add-status-button">
      <AddIcon />
      &nbsp;
      Добавить категорию
    </Button>
  );

  const newNameInput = (
    <div className="add-input-wrapper">
      <TextField onChange={onStatusNameChange} size="small" variant="outlined" placeholder="Название категории..." />
      <IconButton onClick={onAddStatusInner}><DoneIcon /></IconButton>
      <IconButton onClick={cancel}><ClearIcon /></IconButton>
    </div>
  );

  return (
    <div className="kanban-wrapper">
      {statuses.map((s) => (
        <TicketsStack
          onAddNewClick={onAddNewClick}
          key={s.ticketStatusId}
          status={s}
          tickets={tickets.filter((t) => t.statusId === s.ticketStatusId)}
          onTicketClick={onTicketClick}
          onRemoveStatus={onRemoveStatus}
        />
      ))}
      <div className="add-status-button-wrapper">
        {
          state.editMode
            ? newNameInput
            : addButton
        }
      </div>
      {state.openDialog
      && (
        <TicketDialog
          open={state.openDialog}
          ticketId={state.currentTicketId}
          onClose={onDialogClose}
          members={members}
          statuses={statuses}
          currentStatusId={Number(state.currentCategoryId)}
          projectId={projectId}
        />
      )}
    </div>
  );
}

export default Board;
