"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var ContactInfo_1 = require("../../components/ContactInfo");
function Settings() {
    return (<react_native_1.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ContactInfo_1.default />
        </react_native_1.View>);
}
exports.default = Settings;
