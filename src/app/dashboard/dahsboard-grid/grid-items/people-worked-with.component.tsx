import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import UserProfile from '../../../shared/models/UserProfile';
import Constants from '../../../Constatns';
import DashboardService from '../../../services/DashboardService';
import AccountThumbnail from '../../../shared/account-thumbnail/account-thumbnail.conmonent';
import EmptyCardText from './empty-card-text.component';
import UserInfo from '../../../shared/models/UserInfo';
import LocalStorageService from '../../../services/LocalStorageService';

import '../../dahsboard-page.styles.sass';


function PeopleWorkedWith() {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<Array<UserProfile>>([]);

  async function loadUsers() {
    const user: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    const result: Array<UserProfile> = await DashboardService.GetUsersRecentlyWorkedWith(user);
    setUsers([...result]);
    setLoading(false);
  }

  useEffect(() => { loadUsers(); }, []);

  function getSection(): React.ReactNode {
    if (loading) {
      return (<div className="mini-loader-wrapper"><CircularProgress color="primary" /></div>);
    }

    if (users.length === 0) {
      return (<EmptyCardText text="Здесь будут отображаться люди, с которыми вы работаете." />);
    }

    return users.map((user) => (<AccountThumbnail key={user.userId} user={user} />));
  }

  return (
    <Zoom in style={{ transitionDelay: '900ms' }}>
      <Card className="drawable-card">
        <CardHeader title="Люди, с которыми вы работали" />
        <CardContent className="card-content">
          {getSection()}
        </CardContent>
        <CardActions>
          <Link className="link" to={Constants.Urls.Pages.TEAMMATES}>
            <Button color="primary">Вся команда</Button>
          </Link>
        </CardActions>
      </Card>
    </Zoom>
  );
}

export default PeopleWorkedWith;
