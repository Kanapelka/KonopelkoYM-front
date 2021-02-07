import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import TabPanel from '../shared/tabs/tab-panel.component';
import FixedSizeContent from '../shared/fixed-size-page/fixed-size-content.component';
import LocalStorageService from '../services/LocalStorageService';
import Constants from '../Constatns';
import UserInfo from '../shared/models/UserInfo';
import ProjectThumbnail from './project-thumbnail.component';
import ProjectThumbnailModel from '../shared/models/ProjectThumbnailModel';
import { IContainerProps } from '../shared/Props';


interface ProjectsViewProps {
  currentTabIndex: number;
  projects: ProjectThumbnailModel[];
}

function EmptyViewText({ className, children }: IContainerProps) {
  return (
    <div className={className}>
      <Typography variant="h5" className="empty-card-text">
        {children}
      </Typography>
    </div>
  );
}

function ProjectsView({ projects, currentTabIndex }: ProjectsViewProps) {
  const { userId } = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);

  const personalProjects = projects.filter((p) => p.ownerId === userId);
  const participatedProjects = projects.filter((p) => p.ownerId !== userId);

  return (
    <FixedSizeContent>
      <Container className="projects-page-content">
        <SwipeableViews index={currentTabIndex}>
          <TabPanel className="projects-tab-content" value={currentTabIndex} index={0}>
            {
              projects.length === 0
                ? <EmptyViewText className="empty-tab-text-wrapper">Нет проектов</EmptyViewText>
                : projects.map((p) => <ProjectThumbnail key={p.projectId} project={p} />)
            }
          </TabPanel>
          <TabPanel className="projects-tab-content" value={currentTabIndex} index={1}>
            {
              personalProjects.length === 0
                ? <EmptyViewText className="empty-tab-text-wrapper">Нет своих проектов</EmptyViewText>
                : personalProjects.map((p) => <ProjectThumbnail key={p.projectId} project={p} />)
            }
          </TabPanel>
          <TabPanel className="projects-tab-content" value={currentTabIndex} index={2}>
            {
              participatedProjects.length === 0
                ? <EmptyViewText className="empty-tab-text-wrapper">Нет проектов, в которые вас пригласили</EmptyViewText>
                : participatedProjects.map((p) => <ProjectThumbnail key={p.projectId} project={p} />)
            }
          </TabPanel>
        </SwipeableViews>
      </Container>
    </FixedSizeContent>
  );
}

export default ProjectsView;
