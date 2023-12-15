"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonoText = void 0;
var Themed_1 = require("./Themed");
function MonoText(props) {
    return <Themed_1.Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]}/>;
}
exports.MonoText = MonoText;
