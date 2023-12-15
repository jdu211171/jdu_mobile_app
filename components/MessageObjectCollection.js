"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageObject_1 = require("./MessageObject");
var MessageObjectCollection = /** @class */ (function () {
    function MessageObjectCollection(messages, state) {
        if (state === void 0) { state = false; }
        this.messages = [];
        console.log('prp', state);
        this.messages = messages;
    }
    // Adds single message to messages
    MessageObjectCollection.prototype.addMessage = function (messageParams) {
        this.messages.push(new MessageObject_1.default(messageParams));
    };
    // Adds array of messages to messages array
    MessageObjectCollection.prototype.addMessages = function (messageParamsArray) {
        var _a;
        var newMessages = messageParamsArray.map(function (params) { return new MessageObject_1.default(params); });
        (_a = this.messages).push.apply(_a, newMessages);
    };
    // Get a specific message by its ID
    MessageObjectCollection.prototype.getMessageById = function (id) {
        return this.messages.find(function (message) { return message.id === id; });
    };
    // Get all messages in the collection
    MessageObjectCollection.prototype.getAllMessages = function () {
        return this.messages;
    };
    // Mark a message as read by ID
    MessageObjectCollection.prototype.markMessageAsRead = function (id) {
        var message = this.getMessageById(id);
        if (message) {
            message.setIsRead(true);
        }
    };
    // Mark a message as read sent by ID
    MessageObjectCollection.prototype.markMessageAsReadSent = function (id) {
        var message = this.getMessageById(id);
        if (message) {
            message.setIsReadSent(true);
        }
    };
    // Toggle message's saved part by ID
    MessageObjectCollection.prototype.markMessageAsSaved = function (id) {
        var message = this.getMessageById(id);
        if (message) {
            message.toggleIsSaved();
        }
    };
    // Mark a message as saved sent by ID
    MessageObjectCollection.prototype.markMessageAsSavedSent = function (id) {
        var message = this.getMessageById(id);
        if (message) {
            message.setIsSavedSent(true);
        }
    };
    // Get all saved messages
    MessageObjectCollection.prototype.getSavedMessages = function () {
        return this.messages.filter(function (message) { return message.isSaved; });
    };
    // Remove a message by ID
    MessageObjectCollection.prototype.removeMessageById = function (id) {
        this.messages = this.messages.filter(function (message) { return message.id !== id; });
    };
    // Clear all messages from the collection
    MessageObjectCollection.prototype.clearAllMessages = function () {
        this.messages = [];
    };
    MessageObjectCollection.prototype.sortMessagesByReadStatus = function () {
        this.messages.sort(function (a, b) {
            // Unread messages should come after read messages
            if (a.isRead === b.isRead) {
                return 0; // Preserve the original order if both messages have the same read status
            }
            return a.isRead ? 1 : -1; // Sort unread messages before read messages
        });
        return this.messages;
    };
    return MessageObjectCollection;
}());
exports.default = MessageObjectCollection;
