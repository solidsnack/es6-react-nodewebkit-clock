global.document = window.document;
global.navigator = window.navigator;

// Load modules into window.
var jstz = require("jstimezonedetect").jstz || require("jstimezonedetect"),
    moment = require("moment-timezone"),
    React = require("react");
