import React, { useEffect, useState } from 'react';
import Zoom from '@material-ui/core/Zoom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import Constants from '../../../Constatns';
import NotificationModel from '../../../shared/models/NotificationModel';
import EmptyCardText from './empty-card-text.component';
import NotificationThumbnail from '../../../shared/notification-numbnail/notification-thumbnail.component';
import NotificationService from '../../../services/NotificationService';
import UserInfo from '../../../shared/models/UserInfo';
import LocalStorageService from '../../../services/LocalStorageService';

import '../../dahsboard-page.styles.sass';


function LatestActivity() {
  const [loading, setLoading] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<Array<NotificationModel>>([]);

  async function loadNotifications() {
    const user: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    const result = await NotificationService.GetNewNotificationsForUser(user);
    setNotifications([...result.slice(0, 4)]);
    setLoading(false);
  }

  useEffect(() => { loadNotifications(); }, []);

  function getSection(): React.ReactNode {
    if (loading) {
      return (<div className="mini-loader-wrapper"><CircularProgress color="primary" /></div>);
    }

    if (notifications.length === 0) {
      return (<EmptyCardText text="Здесь будут отображаться уведомления" />);
    }

    return notifications.map((notification) => (
      <NotificationThumbnail className="latest-activity-thumbnail" notification={notification} />));
  }

  return (
    <Zoom in style={{ transitionDelay: '1200ms' }}>
      <Card className="drawable-card">
        <CardHeader title="Последние уведомления" />
        <CardContent className="card-content">
          {getSection()}
        </CardContent>
      </Card>
    </Zoom>
  );
}

export default LatestActivity;
