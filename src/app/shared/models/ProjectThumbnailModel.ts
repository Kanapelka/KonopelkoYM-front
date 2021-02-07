/* eslint-disable */
import ProjectMember from './ProjectMember';

class ProjectThumbnailModel {
  public constructor(public projectId: number,
                     public projectName: string,
                     public ownerId: number,
                     public ownerName: string,
                     public members: ProjectMember[] = [],
                     public ticketsCount: number = 0) {
  }
}

export default ProjectThumbnailModel;
