import MessageObject, { priorityType } from './MessageObject';

export interface MessageObjectParams {
  id: number;
  title: string;
  description: string;
  priority: priorityType;
  message_type_id: number;
  updated_date: string;
  isRead?: boolean;
  isReadSent?: boolean;
  isSaved?: boolean;
  isSavedSent?: boolean;
}

export default class MessageObjectCollection {
  messages: MessageObject[] = [];

  constructor(messages: MessageObject[],state= false) {
    console.log('prp',state)
    this.messages = messages;
  }

  // Adds single message to messages
  addMessage(messageParams: MessageObjectParams) {
    this.messages.push(new MessageObject(messageParams));
  }

  // Adds array of messages to messages array
  addMessages(messageParamsArray: MessageObjectParams[]) {
    const newMessages = messageParamsArray.map((params) => new MessageObject(params));
    this.messages.push(...newMessages);
  }

  // Get a specific message by its ID
  getMessageById(id: number) {
    return this.messages.find((message) => message.id === id);
  }

  // Get all messages in the collection
  getAllMessages() {
    return this.messages;
  }

  // Mark a message as read by ID
  markMessageAsRead(id: number) {
    const message = this.getMessageById(id);
    if (message) {
      message.setIsRead(true);
    }
  }

  // Mark a message as read sent by ID
  markMessageAsReadSent(id: number) {
    const message = this.getMessageById(id);
    if (message) {
      message.setIsReadSent(true);
    }
  }

  // Toggle message's saved part by ID
  markMessageAsSaved(id: number) {
    const message = this.getMessageById(id);
    if (message) {
      message.toggleIsSaved();
    }
  }

  // Mark a message as saved sent by ID
  markMessageAsSavedSent(id: number) {
    const message = this.getMessageById(id);
    if (message) {
      message.setIsSavedSent(true);
    }
  }

  // Get all saved messages
  getSavedMessages() {
    return this.messages.filter((message) => message.isSaved);
  }

  // Remove a message by ID
  removeMessageById(id: number) {
    this.messages = this.messages.filter((message) => message.id !== id);
  }

  // Clear all messages from the collection
  clearAllMessages() {
    this.messages = [];
  }

  sortMessagesByReadStatus() {
    this.messages.sort((a, b) => {
      // Unread messages should come after read messages
      if (a.isRead === b.isRead) {
        return 0; // Preserve the original order if both messages have the same read status
      }

      return a.isRead ? 1 : -1; // Sort unread messages before read messages
    });
    return this.messages;
  }
}
