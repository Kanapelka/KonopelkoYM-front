import React, { ChangeEvent, useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PriorityLowIcon from '@atlaskit/icon-priority/glyph/priority-low';
import PriorityMajorIcon from '@atlaskit/icon-priority/glyph/priority-major';
import PriorityHighestIcon from '@atlaskit/icon-priority/glyph/priority-highest';
import PriorityMediumIcon from '@atlaskit/icon-priority/glyph/priority-medium';
import PriorityCriticalIcon from '@atlaskit/icon-priority/glyph/priority-critical';

import TicketStatus from '../../shared/models/TicketStatus';
import Ticket from '../../shared/models/Ticket';
import { Priority } from '../../shared/models/TicketThumbnailModel';
import ProjectMember from '../../shared/models/ProjectMember';

import '../project-kanban.styles.sass';


interface TicketDialogContentProps {
  description?: string;
  members: ProjectMember[];
  ticket?: Ticket;
  statuses: TicketStatus[];
  currentStatusId: number;
  changeAssignee: Function;
  changeStatus: Function;
  changeDescription: Function;
  changePriority: Function;
}

function TicketDialogContent({
  members, ticket, statuses, currentStatusId,
  changeAssignee, changeDescription, changeStatus, changePriority,
}: TicketDialogContentProps) {
  const [descriptionInner, setDescription] = useState<string>(ticket?.description || '');
  const [assignee, setAssignee] = useState<number>(ticket?.assigneeId || 0);
  const [statusId, setStatusId] = useState<number>(currentStatusId);
  const p: Priority = ticket?.priority === undefined ? Priority.Medium : ticket.priority;
  const [priority, setPriority] = useState<Priority>(p);

  function onSelectAssignee(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) {
    const userId: number = Number(Number(event.target.value));
    setAssignee(userId);
    changeAssignee(userId);
  }

  function onStatusChange(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) {
    setStatusId(Number(event.target.value));
    changeStatus(Number(event.target.value));
  }

  function onPriorityChange(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) {
    setPriority(Number(event.target.value));
    changePriority(Number(event.target.value));
  }

  function onSaveDescription() {
    changeDescription(descriptionInner);
  }

  return (
    <DialogContent className="ticket-dialog">
      <div>
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          className="ticket-description"
          variant="outlined"
          defaultValue={descriptionInner}
          multiline
          rows={9}
        />
        <div><Button onClick={onSaveDescription} variant="contained" color="primary">Сохранить описание</Button></div>
      </div>
      <div className="ticket-info">
        <FormControl className="select-assignee-form">
          <Select
            value={assignee}
            onChange={onSelectAssignee}
            variant="outlined"
            className="assignee-select"
          >
            <MenuItem value={0}><em>Никем не исполняется</em></MenuItem>
            {members.map((member) => (
              <MenuItem value={member.userId}>
                <ListItemAvatar>
                  <Avatar>{`${member.firstName[0]}${member.lastName[0]}`}</Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <ListItemText primary={`${member.firstName} ${member.lastName}`} />
                </ListItemText>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="select-assignee-form">
          <Select
            value={statusId}
            variant="outlined"
            className="assignee-select"
            onChange={onStatusChange}
          >
            {statuses.map((status) => (
              <MenuItem value={status.ticketStatusId}>
                <ListItemText primary={status.title} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="select-assignee-form">
          <Select
            value={priority}
            variant="outlined"
            className="assignee-select"
            onChange={onPriorityChange}
          >
            <MenuItem value={Priority.Critical}>
              <ListItemIcon>
                <PriorityCriticalIcon label="Критический" />
              </ListItemIcon>
              <ListItemText primary="Критичекий" />
            </MenuItem>
            <MenuItem value={Priority.VeryHigh}>
              <ListItemIcon>
                <PriorityMajorIcon label="Очень высокий" />
              </ListItemIcon>
              <ListItemText primary="Очень высокий" />
            </MenuItem>
            <MenuItem value={Priority.High}>
              <ListItemIcon>
                <PriorityHighestIcon label="Высокий" />
              </ListItemIcon>
              <ListItemText primary="Высокий" />
            </MenuItem>
            <MenuItem value={Priority.Medium}>
              <ListItemIcon>
                <PriorityMediumIcon label="Средний" />
              </ListItemIcon>
              <ListItemText primary="Средний" />
            </MenuItem>
            <MenuItem value={Priority.Low}>
              <ListItemIcon>
                <PriorityLowIcon label="Низкий" />
              </ListItemIcon>
              <ListItemText primary="Низкий" />
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </DialogContent>
  );
}

export default TicketDialogContent;
