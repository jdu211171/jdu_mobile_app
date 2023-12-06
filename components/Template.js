class Template {
  obj = {
    "data":
      [
        {
          "id": 0,
          "title": "こんにちは",
          "description": "こんにちは",
          "priority": 1,
          "created_date": "2023-10-17 12:00:00",
          "admin_id": 1,
          "updated_date": "2023-10-17 12:00:00",
          "messagetype_id":1
        }
      ]
  };
  constructor(id, title, description, priority, messagetype_id, updated_date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.messagetype_id = messagetype_id;
    this.isRead = false;
    this.isReadSent = false;
    this.isSaved = false;
    this.isSavedSent = false;
    this.updatedDate = updated_date;
  }

  // Setters for each field
  set title(title) {
    this.title = title;
  }

  set description(description) {
    this.description = description;
  }

  set priority(priority) {
    this.priority = priority;
  }

  set messagetype_id(messagetype_id) {
    this.messagetype_id = messagetype_id;
  }

  set isRead(isRead) {
    this.isRead = isRead;
  }

  set isReadSent(isReadSent) {
    this.isReadSent = isReadSent;
  }

  set isSaved(isSaved) {
    this.isSaved = isSaved;
  }

  set isSavedSent(isSavedSent) {
    this.isSavedSent = isSavedSent;
  }

  set updatedDate(updatedDate) {
    this.updatedDate = updatedDate;
  }

  // Getters for each field
  get title() {
    return this.title;
  }

  get description() {
    return this.description;
  }

  get priority() {
    return this.priority;
  }

  get messagetype_id() {
    return this.messagetype_id;
  }

  get isRead() {
    return this.isRead;
  }

  get isReadSent() {
    return this.isReadSent;
  }

  get isSaved() {
    return this.isSaved;
  }

  get isSavedSent() {
    return this.isSavedSent;
  }

  get updatedDate() {
    return this.updatedDate;
  }
}