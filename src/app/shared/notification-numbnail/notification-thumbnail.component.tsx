import React from 'react';
import Typography from '@material-ui/core/Typography';

import { IStyledComponentProps } from '../Props';
import NotificationModel from '../models/NotificationModel';
import ElevatedPaper from '../elevated-paper/elevated-paper.component';
import DateTimeService from '../../services/DateTimeService';

import './notification-thumbnail.styles.sass';


interface NotificationThumbnailProps extends IStyledComponentProps {
  notification: NotificationModel;
}

function NotificationThumbnail({ notification, className }: NotificationThumbnailProps) {
  const message: string = notification.message.length >= 40
    ? `${notification.message.slice(0, 60)}...`
    : notification.message;

  return (
    <ElevatedPaper className={className} defaultElevation={3} onHoverElevation={7}>
      <div className="notification-content-wrapper">
        <div>
          <Typography variant="h6" noWrap>
            {notification.title}
          </Typography>
          <Typography className="message-text">
            {message}
          </Typography>
        </div>
        <div>
          <Typography className="datetime-text">
            {DateTimeService.toNotificationFormat(notification.createdDate)}
          </Typography>
        </div>
      </div>
    </ElevatedPaper>
  );
}

export default NotificationThumbnail;
