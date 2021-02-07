/* eslint-disable */
import UserProfile from './UserProfile';


export enum Priority {
  Critical,
  VeryHigh,
  High,
  Medium,
  Low,
}

class TicketThumbnailModel {
  constructor(public ticketId: number,
              public ticketTitle: string,
              public priority: Priority,
              public statusId: number,
              public status: string,
              public steps: number, // remove it
              public stepsCompleted: number, // remove it
              public assigneeId?: number,
              public assigneeFirstName?: string,
              public assigneeLastName?: string) {
  }

  getPriorityName() {
    switch (this.priority) {
      case 0: return 'Critical';
      case 1: return 'Very High';
      case 2: return 'High';
      case 3: return 'Medium';
      case 4: return 'Low';
    }
  }
}


export default TicketThumbnailModel;
