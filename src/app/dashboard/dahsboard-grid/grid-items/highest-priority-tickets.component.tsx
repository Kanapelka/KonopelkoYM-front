import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import TicketThumbnailModel from '../../../shared/models/TicketThumbnailModel';
import DashboardService from '../../../services/DashboardService';
import TicketThumbnail from '../../../shared/ticket-thumbnail/ticket-thumbnail.component';
import EmptyCardText from './empty-card-text.component';
import Constants from '../../../Constatns';
import UserInfo from '../../../shared/models/UserInfo';
import LocalStorageService from '../../../services/LocalStorageService';

import '../../dahsboard-page.styles.sass';


function HighestPriorityTicket() {
  const [loading, setLoading] = useState<boolean>(true);
  const [tickets, setTickets] = useState<Array<TicketThumbnailModel>>([]);

  async function loadTickets() {
    const user: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    const result = await DashboardService.GetHighestPriorityTickets(user);
    setTickets([...result]);
    setLoading(false);
  }

  useEffect(() => { loadTickets(); }, []);

  function getSection(): React.ReactNode {
    if (loading) {
      return (<div className="mini-loader-wrapper"><CircularProgress color="primary" /></div>);
    }

    if (tickets.length === 0) {
      return (<EmptyCardText text="Здесь появятся задания, над которыми вы работали." />);
    }

    return tickets.map((ticket) => (
      <TicketThumbnail ticket={ticket} className="ticket-thumbnail" />));
  }

  return (
    <Zoom in style={{ transitionDelay: '300ms' }}>
      <Card className="drawable-card">
        <CardHeader title="Задания с наивысшим приоритетом" />
        <CardContent className="card-content">
          {getSection()}
        </CardContent>
        <CardActions>
          <Link className="link" to={Constants.Urls.Pages.PROJECTS}>
            <Button color="primary">Все задания</Button>
          </Link>
        </CardActions>
      </Card>
    </Zoom>
  );
}

export default HighestPriorityTicket;
