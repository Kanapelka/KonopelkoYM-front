import React from 'react';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ProjectThumbnailModel from '../shared/models/ProjectThumbnailModel';
import ProjectMember from '../shared/models/ProjectMember';
import TeammateCard from './teammate-card.component';

import './teammates.styles.sass';


interface ProjectPanelProps {
  project: ProjectThumbnailModel;
  members: Array<ProjectMember>;
}

function ProjectPanel({ project, members }: ProjectPanelProps) {
  return (
    <div className="project-panel-wrapper">
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{project.projectName}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {
            members.length > 0
              ? members.map((m) => (<TeammateCard teammate={m} />))
              : (
                <div className="empty-panel-text-wrapper">
                  <Typography variant="h6">Нет соответствующих членов команды</Typography>
                </div>
              )
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default ProjectPanel;
