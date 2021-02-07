import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import DoneIcon from '@material-ui/icons/Done';

import Task from '../../shared/models/Task';


interface TicketTasksProps {
  tasks: Array<Task>;
  ticketId: number,
  onTaskChanged: (task: Task) => Promise<void> | void;
  onTaskDeleted: (id: number) => Promise<void> | void;
  onTaskAdded: (task: Task) => Promise<void> | void;
}

function TicketTasks({
  tasks, ticketId, onTaskAdded, onTaskChanged, onTaskDeleted,
}: TicketTasksProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>('');

  const getTasksCompleted = (source: Array<Task>) => {
    const completed = source.filter((t) => (t.done)).length;
    return (completed / source.length) * 100;
  };

  const checkTask = (id: number, value: boolean) => {
    // @ts-ignore
    const task: Task = tasks.find((t) => (t.taskId === id));
    task.done = value;
    onTaskChanged(task);
  };

  const addTask = () => {
    onTaskAdded(new Task(0, ticketId, taskName, false));
    setTaskName('');
    setEditMode(false);
  };

  return (
    <DialogContent>
      {tasks.length !== 0 && (
        <LinearProgress variant="determinate" value={getTasksCompleted(tasks)} />
      )}
      <List>
        {tasks.map((t) => (
          <ListItem button dense onClick={() => checkTask(t.taskId, !t.done)}>
            <ListItemIcon>
              <Checkbox onChange={(e) => checkTask(t.taskId, e.target.checked)} checked={t.done} />
            </ListItemIcon>
            <ListItemText primary={t.title} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => onTaskDeleted(t.taskId)}><CloseIcon /></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        {
          editMode
            ? (
              <ListItem dense>
                <TextField
                  style={{ width: 500, paddingLeft: 10 }}
                  placeholder="Название подзадачи"
                  onChange={(e) => setTaskName(e.target.value)}
                />
                <IconButton onClick={addTask}><DoneIcon /></IconButton>
                <IconButton onClick={() => setEditMode(false)}><CloseIcon /></IconButton>
              </ListItem>
            )
            : (
              <ListItem button onClick={() => setEditMode(true)}>
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary="Добавить подзадачу" />
              </ListItem>
            )
        }
      </List>
    </DialogContent>
  );
}

export default TicketTasks;
