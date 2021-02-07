import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import Constants from '../Constatns';
import ProjectThumbnailModel from '../shared/models/ProjectThumbnailModel';

import './projects-page.styles.sass';


const orange: string = '#ff5722';
const purple: string = '#673ab7';

interface ProjectThumbnailProps {
  project: ProjectThumbnailModel;
}

function ProjectThumbnail({ project }: ProjectThumbnailProps) {
  const navigateToSettings: string = `${Constants.Urls.Pages.PROJECTS}/${project.projectId}/settings`;


  const goToSettingsButton = (<Button color="primary" component={Link} to={navigateToSettings}>Настройки</Button>);

  return (
    <Link to={`${Constants.Urls.Pages.PROJECTS}/${project.projectId}/tickets`} className="link">
      <Card className="project-thumbnail-card">
        <CardHeader title={project.projectName} action={goToSettingsButton} />
        <CardContent>
          <p className="owner-text">
            Владелец: {project.ownerName}
          </p>
          <AvatarGroup max={4}>
            {project.members.map((m, index) => (
              <Avatar key={m.userId} style={{ backgroundColor: index % 2 === 0 ? purple : orange }}>
                {`${m.firstName[0]}${m.lastName[0]}`}
              </Avatar>
            ))}
          </AvatarGroup>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProjectThumbnail;
