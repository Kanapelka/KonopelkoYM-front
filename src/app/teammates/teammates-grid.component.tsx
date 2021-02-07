import React from 'react';
import Container from '@material-ui/core/Container';

import ProjectMember from '../shared/models/ProjectMember';
import ProjectThumbnailModel from '../shared/models/ProjectThumbnailModel';
import ProjectPanel from './project-panel.component';
import FixedSizeContent from '../shared/fixed-size-page/fixed-size-content.component';


interface TeammatesGridProps {
  projects: Array<ProjectThumbnailModel>
  teammates: Array<ProjectMember>;
}

function TeammatesGrid({ projects, teammates }: TeammatesGridProps) {
  return (
    <FixedSizeContent>
      <Container>
        {projects.map((p) => (
          <ProjectPanel project={p} members={teammates.filter((t) => (t.projectId === p.projectId))} />
        ))}
      </Container>
    </FixedSizeContent>
  );
}

export default TeammatesGrid;
