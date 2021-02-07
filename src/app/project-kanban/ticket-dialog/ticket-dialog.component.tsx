import React, { MouseEventHandler, useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

import { Priority } from '../../shared/models/TicketThumbnailModel';
import TicketDialogTitle from './ticket-dialog-title.component';
import TicketDialogContent from './ticket-dialog-content.component';
import ProjectMember from '../../shared/models/ProjectMember';
import TicketStatus from '../../shared/models/TicketStatus';
import Ticket from '../../shared/models/Ticket';
import TicketService from '../../services/tickets/TicketService';
import UserInfo from '../../shared/models/UserInfo';
import LocalStorageService from '../../services/LocalStorageService';
import Constants from '../../Constatns';
import { Result } from '../../services/http/Http';

import TicketTasks from './ticket-tasks.component';
import Task from '../../shared/models/Task';
import TasksService from '../../services/tickets/TasksService';
import CommentModel from '../../shared/models/CommentModel';


const Transition = React.forwardRef((
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

interface TicketDialogProps {
  open: boolean;
  ticketId?: number;
  onClose: MouseEventHandler;
  members: ProjectMember[];
  statuses: TicketStatus[];
  currentStatusId: number;
  projectId: number;
}

function TicketDialog({
  open, ticketId, onClose, members, statuses, currentStatusId, projectId,
}: TicketDialogProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [ticket, setTicket] = useState<Ticket>();
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [comments, setComments] = useState<CommentModel[]>([]);

  function user() : UserInfo {
    return LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
  }

  async function getTicket() {
    if (!ticketId) {
      const newTicket = new Ticket(
        0, projectId, 'Новая задача', '', Priority.Medium, new Date(), new Date(), currentStatusId,
      );
      const result = await TicketService.UpdateOrCreateTicket(newTicket, user());
      setTicket({ ...result.payload });
    } else {
      const ticketLoaded = await TicketService.GetTicket(ticketId, user());
      const tasksLoaded: Result<Array<Task>> = await TicketService.GetTasksAsync(ticketId, user());
      const commentsLoaded: Result<Array<CommentModel>> = await TicketService.GetTicketComments(ticketId, user());
      setTicket({ ...ticketLoaded.payload });
      setTasks([...tasksLoaded.payload]);
      setComments([...commentsLoaded.payload]);
    }

    setLoading(false);
  }

  useEffect(() => {
    getTicket();
  }, []);

  async function saveDescription(description: string) {
    ticket!.description = description;
    // @ts-ignore
    const result: Result<Ticket> = await TicketService.UpdateOrCreateTicket(ticket, user());
    setTicket({ ...result.payload });
  }

  async function changeAssignee(assigneeId: number) {
    ticket!.assigneeId = assigneeId;
    // @ts-ignore
    const result: Result<Ticket> = await TicketService.UpdateOrCreateTicket(ticket, user());
    setTicket({ ...result.payload });
  }

  async function changeStatus(statusId: number) {
    ticket!.statusId = statusId;
    // @ts-ignore
    const result: Result<Ticket> = await TicketService.UpdateOrCreateTicket(ticket, user());
    setTicket({ ...result.payload });
  }

  async function onTicketNameSave(name: string) {
    ticket!.title = name;
    // @ts-ignore
    const result: Result<Ticket> = await TicketService.UpdateOrCreateTicket(ticket, user());
    setTicket({ ...result.payload });
  }

  async function changePriority(priority: Priority) {
    ticket!.priority = priority;
    // @ts-ignore
    const result: Result<Ticket> = await TicketService.UpdateOrCreateTicket(ticket, user());
    setTicket({ ...result.payload });
  }

  async function onAddTask(task: Task): Promise<void> {
    const result = await TasksService.AddTask(task, user());
    tasks.push(result.payload);
    setTasks([...tasks]);
  }

  async function onUpdateTask(task: Task): Promise<void> {
    const result = await TasksService.UpdateTask(task, user());
    const index = tasks.findIndex((t) => (t.taskId === task.taskId));
    tasks[index] = result.payload;
    setTasks([...tasks]);
  }

  async function onDeleteTask(id: number): Promise<void> {
    await TasksService.DeleteTask(id, user());
    const index = tasks.findIndex((t) => (t.taskId === id));
    tasks.splice(index, 1);
    setTasks([...tasks]);
  }

  return (
    <Dialog onClose={onClose} maxWidth="lg" open={open} TransitionComponent={Transition}>
      {
        loading
          ? <div className="ticket-spinner-wrapper"><CircularProgress color="primary" /></div>
          : (
            <div className="ticket-dialog-wrapper">
              <TicketDialogTitle onClose={onClose} onTicketNameSave={onTicketNameSave} ticketTitle={ticket?.title} />
              <TicketDialogContent
                statuses={statuses}
                ticket={ticket}
                members={members}
                currentStatusId={currentStatusId}
                changeDescription={saveDescription}
                changeAssignee={changeAssignee}
                changeStatus={changeStatus}
                changePriority={changePriority}
              />
              <Divider />
              <TicketTasks
                ticketId={ticket!.ticketId}
                tasks={tasks}
                onTaskAdded={onAddTask}
                onTaskChanged={onUpdateTask}
                onTaskDeleted={onDeleteTask}
              />
            </div>
          )
      }
    </Dialog>
  );
}

export default TicketDialog;
