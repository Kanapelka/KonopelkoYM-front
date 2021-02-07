export enum Role {
  Owner,
  Admin,
  User
}

/* eslint-disable */
class ProjectMember {
  constructor(public memberId: number,
              public userId: number,
              public firstName: string,
              public lastName: string,
              public emailAddress: string,
              public jobTitle: string,
              public location: string,
              public projectId: number,
              public projectRole: Role) {
  }
}

export function roleToString(role: Role): string {
  switch (role) {
    case Role.Admin: return 'Администратор';
    case Role.Owner: return 'Владелец';
    case Role.User: return 'Участник';
    default: return '[Ошибка]';
  }
}

export default ProjectMember;
