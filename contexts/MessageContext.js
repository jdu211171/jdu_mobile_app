"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMessageContext = exports.MessageProvider = void 0;
// MessageContext.tsx
var react_1 = require("react");
var async_storage_1 = require("@react-native-async-storage/async-storage");
var MessageObjectCollection_1 = require("../components/MessageObjectCollection");
var netinfo_1 = require("@react-native-community/netinfo");
var MessageObject_1 = require("../components/MessageObject");
var MessageContext = (0, react_1.createContext)(undefined);
var MessageProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(new MessageObjectCollection_1.default([], true)), allMessages = _b[0], setAllMessages = _b[1];
    var _c = (0, react_1.useState)(new MessageObjectCollection_1.default([], true)), savedMessages = _c[0], setSavedMessages = _c[1];
    var currentNetworkStatus = function () {
        return netinfo_1.default.fetch().then(function (state) { return state.isConnected; });
    };
    var addMessage = function (messageParams) {
        // Add the message to both collections
        setAllMessages(function (prev) {
            prev.addMessage(messageParams);
            return new MessageObjectCollection_1.default(__spreadArray([], prev.getAllMessages(), true));
        });
        if (messageParams.isSaved) {
            setSavedMessages(function (prev) {
                prev.addMessage(messageParams);
                return new MessageObjectCollection_1.default(__spreadArray([], prev.getAllMessages(), true));
            });
        }
    };
    var setAllMessageFromApi = function (messages) {
        var messagesArray = [];
        messages.map(function (message) {
            var id = message.id, title = message.title, description = message.description, priority = message.priority, messagetype_id = message.messagetype_id, updated_date = message.updated_date;
            var priorityStatus = ((priority == 1) ? 'high' : (priority == 2) ? 'medium' : 'low');
            messagesArray.push(new MessageObject_1.default({
                id: id,
                title: title,
                description: description,
                priority: priorityStatus,
                message_type_id: messagetype_id,
                updated_date: updated_date,
            }));
        });
        // console.log('msg arr',messagesArray)
        setAllMessages(new MessageObjectCollection_1.default(messagesArray, false));
    };
    var setReadStatus = function (id, status) {
        setAllMessages(function (prev) {
            prev.markMessageAsRead(id);
            return new MessageObjectCollection_1.default(__spreadArray([], prev.getAllMessages(), true));
        });
    };
    var toggleSavedStatus = function (id) {
        setAllMessages(function (prev) {
            prev.markMessageAsSaved(id);
            return new MessageObjectCollection_1.default(__spreadArray([], prev.getAllMessages(), true));
        });
        setSavedMessages(function (prev) {
            prev.markMessageAsSaved(id);
            return new MessageObjectCollection_1.default(__spreadArray([], prev.getAllMessages(), true));
        });
    };
    var getMessagesByPriority = function () {
        var sortedMessages = new MessageObjectCollection_1.default(__spreadArray([], allMessages.getAllMessages(), true));
        sortedMessages.sortMessagesByReadStatus();
        return sortedMessages;
    };
    var updateMessageContent = function (id, updatedParams) {
        setAllMessages(function (prev) {
            var message = prev.getMessageById(id);
            if (message) {
                Object.assign(message, updatedParams);
            }
            return new MessageObjectCollection_1.default(__spreadArray([], prev.getAllMessages(), true));
        });
    };
    var loadMessagesFromAsyncStorage = function (key) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, async_storage_1.default.getItem(key)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result ? JSON.parse(result) : false];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error loading messages from AsyncStorage:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var saveMessagesToAsyncStorage = function (key, allMessages, savedMessages) { return __awaiter(void 0, void 0, void 0, function () {
        var serializedValue, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    serializedValue = JSON.stringify({ allMessages: allMessages, savedMessages: savedMessages });
                    return [4 /*yield*/, async_storage_1.default.setItem(key, serializedValue)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error saving messages to AsyncStorage:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    function fetchMessagesFromAPI(url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions, response, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        requestOptions = {
                            method: options.method,
                            headers: __assign({ 'Content-Type': 'application/json' }, (options.headers || {})),
                        };
                        // Only include the body for non-GET and non-HEAD requests
                        if (options.method !== 'GET' && options.method !== 'HEAD') {
                            requestOptions.body = options.body ? JSON.stringify(options.body) : undefined;
                        }
                        return [4 /*yield*/, fetch(url, requestOptions)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("HTTP error! Status: ".concat(response.status));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 3:
                        error_3 = _a.sent();
                        console.error('Error fetching data:', error_3);
                        throw error_3; // Re-throw the error to handle it in the calling code
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return (<MessageContext.Provider value={{
            allMessages: allMessages,
            setAllMessages: setAllMessages,
            savedMessages: savedMessages,
            setSavedMessages: setSavedMessages,
            currentNetworkStatus: currentNetworkStatus,
            addMessage: addMessage,
            setReadStatus: setReadStatus,
            toggleSavedStatus: toggleSavedStatus,
            getMessagesByPriority: getMessagesByPriority,
            updateMessageContent: updateMessageContent,
            loadMessagesFromAsyncStorage: loadMessagesFromAsyncStorage,
            saveMessagesToAsyncStorage: saveMessagesToAsyncStorage,
            fetchMessagesFromAPI: fetchMessagesFromAPI,
            setAllMessageFromApi: setAllMessageFromApi
        }}>
        {children}
      </MessageContext.Provider>);
};
exports.MessageProvider = MessageProvider;
var useMessageContext = function () {
    var context = (0, react_1.useContext)(MessageContext);
    if (!context) {
        throw new Error('useMessageContext must be used within a MessageProvider');
    }
    return context;
};
exports.useMessageContext = useMessageContext;
