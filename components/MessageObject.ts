export interface MessageObjectParams {
  id: number,
  title: string,
  description: string,
  priority: number,
  message_type_id: number,
  updated_date: string,
  isRead?: boolean,
  isReadSent?: boolean,
  isSaved?: boolean,
  isSavedSent?: boolean
}


export default class MessageObject {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly message_type_id: number;
  readonly updatedDate: string | undefined;
  priority: number;
  isRead: boolean;
  isReadSent: boolean;
  isSaved: boolean;
  isSavedSent: boolean;

  constructor(
    {
      id,
      title,
      description,
      priority,
      message_type_id,
      updated_date,
      isRead = false,
      isReadSent = false,
      isSaved = false,
      isSavedSent = false,
    }: MessageObjectParams
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.message_type_id = message_type_id;
    this.isRead = isRead;
    this.isReadSent = isReadSent;
    this.isSaved = isSaved;
    this.isSavedSent = isSavedSent;
    this.updatedDate = updated_date;
  }

  setIsRead() {
    this.isRead = true;
  }

  setIsReadSent() {
    this.isRead = true;
  }

  toggleIsSaved() {
    this.isSaved = !this.isSaved;
  }

  setIsSavedSent() {
    this.isSaved = true;
  }

  getPriority() {
    switch (this.priority) {
      case 1:
        return 'high';
      case 2:
        return 'medium';
      case 3:
        return 'low';
      default:
        return 'medium';
    }
  }
}


// const message: MessageObject = new MessageObject({
//     id: 1,
//     title: 'Hello',
//     description: 'World',
//     priority: 'high',
//     message_type_id: 2,
//     updated_date: '2023',
//     isRead: true
// });

// obj = {
//   "data":
//       [
//         {
//           "id": 0,
//           "title": "こんにちは",
//           "description": "こんにちは",
//           "priority": 1,
//           "created_date": "2023-10-17 12:00:00",
//           "admin_id": 1,
//           "updated_date": "2023-10-17 12:00:00",
//           "messagetype_id":1
//         }
//       ]
// };