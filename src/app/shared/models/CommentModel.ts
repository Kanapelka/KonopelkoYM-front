/* eslint-disable */
class CommentModel {
  public constructor(public commentId: number,
                     public ticketId: number,
                     public authorId: number,
                     public authorFirstName: string,
                     public authorLastName: string,
                     public message: string,
                     public createdDate: Date) {
  }
}

export default CommentModel;
