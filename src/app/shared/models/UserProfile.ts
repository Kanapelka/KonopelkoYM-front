/* eslint-disable */
class UserProfile {
  constructor(public userId: number,
              public firstName: string,
              public lastName: string,
              public emailAddress: string,
              public jobTitle?: string,
              public location?: string) {
  }
}

export default UserProfile;
