import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Constants from '../../../Constatns';
import DashboardService from '../../../services/DashboardService';
import ProjectThumbnailModel from '../../../shared/models/ProjectThumbnailModel';
import ProjectThumbnail from '../../../shared/project-thumbnail/project-thumbnail.component';
import EmptyCardText from './empty-card-text.component';
import UserInfo from '../../../shared/models/UserInfo';
import LocalStorageService from '../../../services/LocalStorageService';


function RecentProjects() {
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<Array<ProjectThumbnailModel>>([]);

  async function loadProject() {
    const user: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    const result: Array<ProjectThumbnailModel> = await DashboardService.GetRecentProjects(user);
    setProjects([...result]);
    setLoading(false);
  }

  useEffect(() => { loadProject(); }, []);

  function getSection(): React.ReactNode {
    if (loading) {
      return (<div className="mini-loader-wrapper"><CircularProgress color="primary" /></div>);
    }

    if (projects.length === 0) {
      return (<EmptyCardText text="Здесь будут появлятся проекты, над котромы вы работаете." />);
    }

    return projects.map((project) => (
      <ProjectThumbnail className="dashboard-project-thumbnail" project={project} />));
  }

  return (
    <Zoom in style={{ transitionDelay: '600ms' }}>
      <Card className="drawable-card">
        <CardHeader title="Проекты" />
        <CardContent className="card-content">
          {getSection()}
        </CardContent>
        <CardActions>
          <Link className="link" to={Constants.Urls.Pages.PROJECTS}>
            <Button color="primary">Все проекты</Button>
          </Link>
        </CardActions>
      </Card>
    </Zoom>
  );
}

export default RecentProjects;
