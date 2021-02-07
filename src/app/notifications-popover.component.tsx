import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import NotificationModel from './shared/models/NotificationModel';
import DateTimeService from './services/DateTimeService';

import './pages.styles.sass';


interface NotificationsPopoverProps {
  onExpireAll: Function;
  onExpire: (id: number) => void | Promise<void>;
  onSeeAll: Function;
  notifications: Array<NotificationModel>;
}

function NotificationsPopup({ notifications, onExpire, onExpireAll, onSeeAll }: NotificationsPopoverProps) {
  return (
    <Card>
      <CardContent className="notifications-popover-content">
        {
          notifications.length > 0
            ? (
              <List>
                {notifications.map((n) => (
                  <ListItem dense>
                    <ListItemText primary={n.title} secondary={DateTimeService.toNotificationFormat(n.createdDate)} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => onExpire(n.notificationId)}>
                        <CloseIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )
            : (
              <div className="empty-notifications-text-wrapper">
                <Typography variant="h6" className="empty-notifications-text">Всё схвачено!<br /> Хорошего дня!</Typography>
              </div>
            )
        }
      </CardContent>
      <CardActions>
        <Button onClick={() => onSeeAll()} style={{ width: 100 }} variant="outlined" color="primary">Все</Button>
        <Button onClick={() => onExpireAll()} variant="contained" color="secondary">Очистить</Button>
      </CardActions>
    </Card>
  );
}

export default NotificationsPopup;
