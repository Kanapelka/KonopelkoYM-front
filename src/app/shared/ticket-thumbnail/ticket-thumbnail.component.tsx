import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import Constants from '../../Constatns';
import PriorityIcon from '../priority-icon/priority-icon.component';
import AssigneeThumbnail from './assignee-thumbnail.component';

import TicketThumbnailModel from '../models/TicketThumbnailModel';

import { IStyledComponentProps } from '../Props';

import './ticket-thumbnail.styles.sass';


interface TicketThumbnailProps extends IStyledComponentProps {
  ticket: TicketThumbnailModel;
}

function TicketThumbnail({ ticket, className }: TicketThumbnailProps) {
  const [elevation, setElevation] = useState<number>(3);

  const title = ticket.ticketTitle.length >= 20
    ? `${ticket.ticketTitle.slice(0, 23)}...`
    : ticket.ticketTitle;

  return (
    <Paper
      elevation={elevation}
      onMouseEnter={() => { setElevation(7); }}
      onMouseLeave={() => { setElevation(3); }}
      className={className}
    >
      <div className="items">
        <div>
          <Typography noWrap className="ticket-thumbnail-title" variant="h6">
            {title}
          </Typography>
          {ticket.steps > 0
          && <LinearProgress variant="determinate" value={(ticket.stepsCompleted / ticket.steps) * 100} /> }
        </div>
        <div className="icons-section">
          <PriorityIcon className="ticket-icons" priority={ticket.priority} />
          {ticket.assigneeId && (
            <AssigneeThumbnail
              assignee={{
                assigneeId: ticket.assigneeId,
                firstName: String(ticket.assigneeFirstName),
                lastName: String(ticket.assigneeLastName),
              }}
            />
          )}
        </div>
      </div>
    </Paper>
  );
}

export default TicketThumbnail;
