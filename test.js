var MessageObj = /** @class */ (function () {
    function MessageObj(_a) {
        var id = _a.id, _b = _a.isRead, isRead = _b === void 0 ? false : _b;
        this.id = id;
        this.isRead = isRead;
    }
    MessageObj.prototype.setIsRead = function (boolVal) {
        this.isRead = boolVal;
    };
    return MessageObj;
}());
var MessageObjCollection = /** @class */ (function () {
    function MessageObjCollection() {
        this.messages = [];
    }
    MessageObjCollection.prototype.addMessages = function (messageParamsArray) {
        var _a;
        var newMessages = messageParamsArray.map(function (params) {
            // Check if it's already a MessageObject
            return params instanceof MessageObj ? params : new MessageObj(params);
        });
        (_a = this.messages).push.apply(_a, newMessages);
    };
    MessageObjCollection.prototype.sortMessagesByReadStatus = function () {
        this.messages.sort(function (a, b) {
            // Unread messages should come after read messages
            if (a.isRead === b.isRead) {
                return 0; // Preserve the original order if both messages have the same read status
            }
            return a.isRead ? 1 : -1; // Sort unread messages before read messages
        });
        return this.messages;
    };
    return MessageObjCollection;
}());
var msg1 = new MessageObj({ id: 1, isRead: true });
var msg2 = new MessageObj({ id: 2, isRead: false });
var msg3 = new MessageObj({ id: 3, isRead: true });
var msg4 = new MessageObj({ id: 4, isRead: false });
var msg5 = new MessageObj({ id: 5, isRead: false });
var msg6 = new MessageObj({ id: 6, isRead: true });
var msgCol = new MessageObjCollection();
msgCol.addMessages([msg1, msg2, msg3, msg4, msg5, msg6]);
console.log(msgCol.sortMessagesByReadStatus());
