import React, { ChangeEvent, MouseEventHandler, useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import '../project-settings.styles.sass';
import TextField from '@material-ui/core/TextField';
import GenericDialog from '../../shared/generic-dialog/generic-dialog.component';


interface DangerousZoneProps {
  projectName?: string,
  onDelete: MouseEventHandler<HTMLInputElement>;
}

type SectionState = {
  dialogOpen: boolean;
  confirmText: string;
};

function DangerousZone({ onDelete, projectName }: DangerousZoneProps) {
  const [state, setState] = useState<SectionState>({ dialogOpen: false, confirmText: '' });

  function onConfirmTextChange(event: ChangeEvent<HTMLInputElement>) {
    state.confirmText = event.target.value;
    setState({ ...state });
  }

  function openDialog() {
    state.dialogOpen = true;
    setState({ ...state });
  }

  function closeDialog() {
    state.confirmText = '';
    state.dialogOpen = false;
    setState({ ...state });
  }

  const disableConfirm = () => (state.confirmText !== projectName);
  const warningText: string = `
    Это действие не может быть отменено.
    Вместе с проектом, также удаляться и все задания, весь прогерсс будет утерян.
    Для того, чтобы подвердить удаление, введите имя проекта '${projectName}' в поле ниже.
  `;

  return (
    <div className="dangerous-zone-section-wrapper">
      <ExpansionPanel className="dangerous-zone-section">
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color="error" variant="h5">Опасная зона</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Button
            onClick={openDialog}
            className="delete-project-button"
            variant="outlined"
            color="secondary"
          >
            Удалить проект
          </Button>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <GenericDialog
        opened={state.dialogOpen}
        title="Удаление проекта"
        confirmText="Удалить"
        onConfirm={onDelete}
        disableConfirm={disableConfirm()}
        onClose={closeDialog}
        confirmButtonSeverity="danger"
      >
        <div className="delete-dialog-content">
          <Typography className="delete-dialog-warning-message">
            {warningText}
          </Typography>
          <TextField className="delete-confirm-text" onChange={onConfirmTextChange} label="Название проекта" />
        </div>
      </GenericDialog>
    </div>
  );
}

export default DangerousZone;
