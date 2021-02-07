import { Priority } from './TicketThumbnailModel';

/* eslint-disable */
class Ticket {
  constructor(public ticketId: number,
              public projectId: number,
              public title: string,
              public description: string,
              public priority: Priority,
              public createdDate: Date,
              public lastModifiedDate: Date,
              public statusId: number,
              public assigneeId?: number) {
  }
}

export default Ticket;
