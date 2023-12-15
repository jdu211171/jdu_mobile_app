"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageObject = /** @class */ (function () {
    function MessageObject(_a) {
        var id = _a.id, title = _a.title, description = _a.description, priority = _a.priority, message_type_id = _a.message_type_id, updated_date = _a.updated_date, _b = _a.isRead, isRead = _b === void 0 ? false : _b, _c = _a.isReadSent, isReadSent = _c === void 0 ? false : _c, _d = _a.isSaved, isSaved = _d === void 0 ? false : _d, _e = _a.isSavedSent, isSavedSent = _e === void 0 ? false : _e;
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
    MessageObject.prototype.setIsRead = function (booleanValue) {
        this.isRead = booleanValue;
    };
    MessageObject.prototype.setIsReadSent = function (booleanValue) {
        this.isRead = booleanValue;
    };
    MessageObject.prototype.toggleIsSaved = function () {
        this.isRead = !this.isRead;
    };
    MessageObject.prototype.setIsSavedSent = function (booleanValue) {
        this.isRead = booleanValue;
    };
    return MessageObject;
}());
exports.default = MessageObject;
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
