"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCollection = void 0;
var MessageObject_1 = require("./MessageObject");
var async_storage_1 = require("@react-native-async-storage/async-storage");
var MessageCollection = /** @class */ (function () {
    function MessageCollection() {
        this.messages = [];
        this.last_message_id = null;
    }
    Object.defineProperty(MessageCollection.prototype, "get_messages", {
        get: function () {
            return this.retrieveMessages;
        },
        enumerable: false,
        configurable: true
    });
    //
    // public retrieveMessages() {
    //     // Use then to handle the promise
    //     this.fetchMessages()
    //       .then(() => {
    //         // Use the forEach method on the messages array
    //         this.messages.forEach(message => {
    //             // Print out each message object
    //             console.log(message);
    //         });
    //     });
    // }
    MessageCollection.prototype.retrieveMessages = function () {
        var _this = this;
        // Use then and catch to handle the promise
        this.fetchMessages()
            // .then(() => {
            //     // Use the forEach method on the messages array
            //     this.messages.forEach(message => {
            //         // Print out each message object
            //         console.log(message);
            //     });
            // })
            .catch(function (error) {
            // Handle the error
            console.error(error);
            // Run this.setFromLocalMessages() function
            _this.setFromLocalMessages();
        });
    };
    // get message from api and add in messages field new messages
    // private fetchMessages() {}
    MessageCollection.prototype.fetchMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, _i, _a, item, message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch('https://wfjz3m1ilh.execute-api.eu-north-1.amazonaws.com/default/api/messages')];
                    case 1:
                        response = _b.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        // Check if the data has a status property with value 'success'
                        if (data.status === 'success') {
                            // Loop through the data array
                            for (_i = 0, _a = data.data; _i < _a.length; _i++) {
                                item = _a[_i];
                                message = new MessageObject_1.default({
                                    id: item.id,
                                    title: item.title,
                                    description: item.description,
                                    // Convert the priority number to priority type
                                    priority: item.priority === 1 ? 'high' : item.priority === 2 ? 'medium' : 'low',
                                    message_type_id: item.messagetype_id,
                                    updated_date: item.updated_date
                                });
                                // Push the message to the messages array
                                this.messages.push(message);
                            }
                        }
                        else {
                            // Handle the case when the data status is not 'success'
                            console.error('Data status is not success');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        // Handle the case when the response is not successful
                        console.error('Response is not ok');
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // get message from api lastet message and add in messages field new messages
    MessageCollection.prototype.fetchLatestMessages = function () {
    };
    // this function save all messages to localstorage
    // Nur Islom MeesageObject.getAllFields ishlatib malumot olasiz
    MessageCollection.prototype.saveMessagesToLocal = function () {
    };
    // this function get messages from localstorage and assign to messages field
    // private setFromLocalMessages() {}
    // This function get messages from localstorage and assign to messages field
    MessageCollection.prototype.setFromLocalMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var value, messagesArray, _i, messagesArray_1, item, message, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, async_storage_1.default.getItem('messages')];
                    case 1:
                        value = _a.sent();
                        // Check if the value is not null
                        if (value !== null) {
                            messagesArray = JSON.parse(value);
                            // Loop through the array
                            for (_i = 0, messagesArray_1 = messagesArray; _i < messagesArray_1.length; _i++) {
                                item = messagesArray_1[_i];
                                message = new MessageObject_1.default({
                                    id: item.id,
                                    title: item.title,
                                    description: item.description,
                                    priority: item.priority,
                                    message_type_id: item.message_type_id,
                                    updated_date: item.updated_date
                                });
                                // Push the message to the messages array
                                this.messages.push(message);
                            }
                        }
                        else {
                            // Handle the case when the value is null
                            console.log('No messages found in local storage');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        // Handle any error
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return MessageCollection;
}());
exports.MessageCollection = MessageCollection;
// const messageCollection = new MessageCollection();
// messageCollection.retrieveMessages();
// console.log(messageCollection.get_messages())
