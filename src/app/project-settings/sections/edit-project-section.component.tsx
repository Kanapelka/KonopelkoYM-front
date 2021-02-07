import React, {ChangeEvent, createRef,  useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import '../project-settings.styles.sass';


interface EditProjectSectionProps {
  projectName?: string;
  allowEdit: boolean;
  updateName: Function;
}

type SectionState = {
  editMode: boolean;
  newProjectName: string;
};

function EditProjectSection({ projectName, allowEdit, updateName }: EditProjectSectionProps) {
  const editFieldRef = createRef<HTMLInputElement>();
  const defaultState: SectionState = { editMode: false, newProjectName: projectName || '' };
  const [state, setState] = useState<SectionState>(defaultState);

  function onProjectNameChange(event: ChangeEvent<HTMLInputElement>) {
    state.newProjectName = event.target.value;
    setState({ ...state });
  }

  function startEdit() {
    state.editMode = true;
    setState({ ...state });
  }

  function cancelEditing() {
    state.editMode = false;
    // @ts-ignore
    editFieldRef.current.value = projectName;
    setState({ ...state });
  }

  function confirmEditing() {
    updateName(state.newProjectName);
    cancelEditing();
  }

  // @ts-ignore

  return (
    <Card>
      <CardHeader title="Основные настройки" />
      <CardContent>
        <section className="edit-project-name-section">
          <Typography variant="h6">Название проекта: </Typography>
          <span className="edit-project-name-field-wrapper">
            <TextField
              inputRef={editFieldRef}
              className="edit-project-name-field"
              variant="outlined"
              defaultValue={projectName}
              onChange={onProjectNameChange}
              InputProps={{ readOnly: !state.editMode }}
            />
          </span>
          {
            state.editMode
              ? (
                <>
                  <IconButton onClick={confirmEditing}><DoneIcon /></IconButton>
                  <IconButton onClick={cancelEditing}><ClearIcon /></IconButton>
                </>
              )
              : allowEdit && <IconButton onClick={startEdit}><EditIcon /></IconButton>
          }
        </section>
      </CardContent>
    </Card>
  );
}

export default EditProjectSection;
