import MessageObject, { MessageObjectParams } from './MessageObject';

export default class MessageObjectCollection {
  messages: MessageObject[] = [];

  constructor(messages: MessageObject[]) {
    this.messages = messages;
  }

  addMessage(messageParams: MessageObject) {
    this.messages.push(messageParams);
  }

  addMessages(messageParamsArray: MessageObjectParams[]) {
    const newMessages = messageParamsArray.map((params) => new MessageObject(params));
    this.messages.push(...newMessages);
  }

  getMessageById(id: number) {
    return this.messages.find((message) => message.id === id);
  }

  getAllMessages() {
    return this.messages;
  }

  markMessageAsRead(id: number) {
    const message = this.getMessageById(id);
    if (message) {
      message.setIsRead();
    }
  }

  markMessageAsReadSent(id: number) {
    const message = this.getMessageById(id);
    if (message) {
      message.setIsReadSent();
    }
  }

  markMessageAsSaved(id: number) {
    const message = this.getMessageById(id);
    if (message) {
      message.setIsSaved();
    }
  }

  markMessageAsSavedSent(id: number) {
    const message = this.getMessageById(id);
    if (message) {
      message.setIsSavedSent();
    }
  }

  getSavedMessages() {
    return this.messages.filter((message) => message.isSaved);
  }

  removeMessageById(id: number) {
    this.messages = this.messages.filter((message) => message.id !== id);
  }

  clearAllMessages() {
    this.messages = [];
  }

  sortMessagesByReadStatus() {
    this.messages.sort((a, b) => {
      if (a.isRead === b.isRead) {
        return 0;
      }

      return a.isRead ? 1 : -1;
    });
    return this.messages;
  }
}