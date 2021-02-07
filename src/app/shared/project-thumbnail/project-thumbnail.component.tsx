import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import { IStyledComponentProps } from '../Props';
import ProjectThumbnailModel from '../models/ProjectThumbnailModel';
import Constants from '../../Constatns';

import './project-thumbnail.styles.sass';


interface ProjectThumbnailProps extends IStyledComponentProps {
  project: ProjectThumbnailModel;
}

function ProjectThumbnail({ project, className }: ProjectThumbnailProps) {
  const link: string = `${Constants.Urls.Pages.PROJECTS}/${project.projectId}/tickets`;
  const [elevation, setElevation] = useState<number>(3);

  return (
    <Paper
      elevation={elevation}
      onMouseEnter={() => { setElevation(7); }}
      onMouseLeave={() => { setElevation(3); }}
      className={`${className}`}
    >
      <Link to={link} className="link wrapper">
        <div className="project-thumbnail-content">
          <Typography variant="h6">
            {project.projectName}
          </Typography>
          <div className="tickets-section">
            <FormatListBulletedIcon />
            <Typography>
              {`: ${project.ticketsCount}`}
            </Typography>
          </div>
        </div>
      </Link>
    </Paper>
  );
}

export default ProjectThumbnail;
