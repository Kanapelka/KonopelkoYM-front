import React, {ChangeEvent, createRef, MouseEventHandler, useState} from 'react';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import Constants from '../../Constatns';
import GenericDialog from '../../shared/generic-dialog/generic-dialog.component';
import ProjectMember, {Role, roleToString} from '../../shared/models/ProjectMember';

import '../project-settings.styles.sass';


const orange: string = '#ff5722';
const purple: string = '#673ab7';

interface MemberActionProps {
  onRemove: Function;
  onChangeRole: Function;
  member: ProjectMember;
}

function MemberAction({ onChangeRole, onRemove, member }: MemberActionProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function onChangeRoleInner() {
    setAnchorEl(null);
    if (member.projectRole === Role.Admin) {
      return onChangeRole(member.memberId, Role.User);
    }
    return onChangeRole(member.memberId, Role.Admin);
  }

  function onRemoveInner() {
    setAnchorEl(null);
    onRemove(member.memberId);
  }

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}><MoreVertIcon /></IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={onChangeRoleInner}>Сменить роль</MenuItem>
        <MenuItem onClick={onRemoveInner}><Typography color="error">Выгнать</Typography></MenuItem>
      </Menu>
    </>
  );
}

interface ManageProjectMembersProps {
  members: ProjectMember[];
  onChangeRole: Function;
  onRemove: Function;
  onAddMember: Function;
  allowAdd: boolean;
}

type SectionState = {
  roleSelected: number,
  openDialog: boolean;
  newMemberEmail: string;
};

function ManageProjectMembers({
  members, onChangeRole, onRemove, onAddMember, allowAdd,
}: ManageProjectMembersProps) {
  const inputRef = createRef<HTMLInputElement>();
  const defaultState: SectionState = { roleSelected: 0, openDialog: false, newMemberEmail: '' };
  const [state, setState] = useState<SectionState>(defaultState);

  function onRoleChanged(event: React.ChangeEvent<{ value: unknown }>) {
    state.roleSelected = event.target.value as number
    setState({ ...state });
  }

  function openDialog() {
    state.openDialog = true;
    setState({ ...state });
  }

  function closeDialog() {
    state.openDialog = false;
    state.newMemberEmail = '';
    // @ts-ignore
    inputRef.current.value = '';
    setState({ ...state });
  }

  function onNewMemberEmailChanged(event: ChangeEvent<HTMLInputElement>) {
    state.newMemberEmail = event.target.value;
    setState({ ...state });
  }

  const selectRole = (
    <FormControl variant="outlined" size="small">
      <Select value={state.roleSelected} onChange={onRoleChanged} className="role-select">
        <MenuItem value={0}>Все</MenuItem>
        <MenuItem value={1}>Администраторы</MenuItem>
        <MenuItem value={2}>Пользователи</MenuItem>
      </Select>
    </FormControl>
  );

  let membersToDisplay: ProjectMember[];

  switch (state.roleSelected) {
    case 1:
      membersToDisplay = members.filter((m) => m.projectRole === Role.Admin);
      break;
    case 2:
      membersToDisplay = members.filter((m) => m.projectRole === Role.User);
      break;
    default:
      membersToDisplay = members;
  }

  return (
    <Card className="manage-project-members-card">
      <CardHeader title="Команда проекта" action={selectRole} />
      <CardContent className="empty-members-section-content">
        {membersToDisplay.length === 0
          ? <Typography className="empty-members-section-text" variant="h5">Нет членов команды с такой ролью</Typography>
          : membersToDisplay.map((m, index) => (
            <Card variant="outlined" className="member-card">
              <CardHeader
                avatar={(
                  <Avatar style={{ backgroundColor: index % 2 === 0 ? purple : orange }}>
                    {`${m.firstName[0]}${m.lastName[0]}`}
                  </Avatar>
                )}
                title={`${m.firstName} ${m.lastName}`}
                subheader={roleToString(m.projectRole)}
                action={
                  m.projectRole === Role.Owner
                    ? null
                    : <MemberAction member={m} onChangeRole={onChangeRole} onRemove={onRemove} />
                }
              />
            </Card>
          ))}
      </CardContent>
      <CardActions>
        <Button
          disabled={!allowAdd}
          onClick={openDialog}
          className="invite-button"
          color="primary"
          variant="contained"
        >
          Пригласить
        </Button>
      </CardActions>
      <GenericDialog
        opened={state.openDialog}
        title="Добавить в команду"
        confirmText="Пригласить"
        onConfirm={() => onAddMember(state.newMemberEmail)}
        onClose={closeDialog}
      >
        <div className="new-member-input-field-wrapper">
          <TextField
            inputRef={inputRef}
            label="Почта"
            className="new-member-input-field"
            onChange={onNewMemberEmailChanged}
          />
        </div>
      </GenericDialog>
    </Card>
  );
}

export default ManageProjectMembers;
