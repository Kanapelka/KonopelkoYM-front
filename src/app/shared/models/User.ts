/* eslint-disable */
class User {
  constructor(public userId: number,
              public firstName: string,
              public lastName: string,
              public emailAddress: string,
              public password: string,
              public isActive: boolean,
              public jobTitle?: string,
              public location?: string) {
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  getInitials(): string {
    return `${this.firstName[0]}${this.lastName[0]}`
  }
}

export default User;
