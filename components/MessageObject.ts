export type priorityType = 'high' | 'medium' | 'low';

export interface MessageObjectParams {
  id: number,
  title: string,
  description: string,
  priority: priorityType,
  message_type_id: number,
  updated_date?: string,
  isRead?: boolean,
  isReadSent?: boolean,
  isSaved?: boolean,
  isSavedSent?: boolean
}


export default class MessageObject {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly priority: priorityType;
  readonly message_type_id: number;
  isRead: boolean;
  isReadSent: boolean;
  isSaved: boolean;
  isSavedSent: boolean;
  readonly updatedDate: string | undefined;

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

  setIsRead(booleanValue: boolean) {
    this.isRead = booleanValue;
  }

  setIsReadSent(booleanValue: boolean) {
    this.isRead = booleanValue;
  }

  toggleIsSaved() {
    this.isRead = !this.isRead;
  }

  setIsSavedSent(booleanValue: boolean) {
    this.isRead = booleanValue;
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