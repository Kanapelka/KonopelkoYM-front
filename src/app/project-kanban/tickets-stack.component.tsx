import React, {ReactNode, useState} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import TicketStatus from '../shared/models/TicketStatus';
import TicketThumbnailModel from '../shared/models/TicketThumbnailModel';
import TicketThumbnail from '../shared/ticket-thumbnail/ticket-thumbnail.component';

import './project-kanban.styles.sass';


interface TicketsStackProps {
  status: TicketStatus;
  tickets: TicketThumbnailModel[];
  onRemoveStatus: Function;
  onAddNewClick: Function;
  onTicketClick: Function;
}

function TicketsStack({
  status, tickets, onAddNewClick, onTicketClick, onRemoveStatus,
}: TicketsStackProps) {
  function onAddClick() {
    onAddNewClick(status.ticketStatusId);
  }

  const action: ReactNode = (
    <IconButton onClick={() => onRemoveStatus(status.ticketStatusId)}><CloseIcon /></IconButton>
  );

  return (
    <Card style={{ backgroundColor: '#ebecf0' }} className="ticket-stack-card">
      <CardHeader title={status.title} action={action} />
      <CardContent>
        <div className="ticket-stack-content">
          {tickets.map((t) => (
            <div className="ticket-wrapper" onClick={() => onTicketClick(t.ticketId)}>
              <TicketThumbnail ticket={t} />
            </div>
          ))}
        </div>
      </CardContent>
      <CardActions>
        <Button onClick={onAddClick} variant="contained" color="primary">Добавить задачу</Button>
      </CardActions>
    </Card>
  );
}

export default TicketsStack;
