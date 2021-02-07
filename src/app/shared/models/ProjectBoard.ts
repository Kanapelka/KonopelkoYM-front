/* eslint-disable */
import ProjectMember from './ProjectMember';
import TicketStatus from './TicketStatus';
import TicketThumbnailModel from './TicketThumbnailModel';

class ProjectBoard {
  public constructor(public projectId: number,
                     public name: string,
                     public statuses: TicketStatus[] = [],
                     public members: ProjectMember[] = [],
                     public tickets: TicketThumbnailModel[] = []) {
  }
}

export default ProjectBoard;
