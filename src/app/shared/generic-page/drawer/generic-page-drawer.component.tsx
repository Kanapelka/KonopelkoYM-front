import React, { MouseEventHandler } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import DateTimeService from '../../../services/DateTimeService';
import NotificationModel from '../../models/NotificationModel';

import '../generic-pge.styles.sass';
import TooltipButton from '../../tooltipped-buttons/tooltip-button.component';


interface NotificationsDrawerProps {
  onExpireAll: Function;
  onExpire: (id: number) => void | Promise<void>;
  notifications: Array<NotificationModel>;
  open: boolean;
  onClose: MouseEventHandler;
}

function NotificationsDrawer({
  onExpire, onExpireAll, notifications, open, onClose,
}: NotificationsDrawerProps) {
  return (
    <Drawer anchor="right" className="drawer" open={open} onClose={onClose}>
      <div className="clear-notification-button">
        <TooltipButton icon={<CloseIcon />} onClick={() => onExpireAll()} tooltip="Очистить всё" />
      </div>
      <div className="drawer-list">
        <List>
          {notifications.map((n) => (
            <ListItem dense>
              <ListItemText
                primary={`${n.title}, ${DateTimeService.toNotificationFormat(n.createdDate)}`}
                secondary={n.message}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => onExpire(n.notificationId)}>
                  <CloseIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

export default NotificationsDrawer;
