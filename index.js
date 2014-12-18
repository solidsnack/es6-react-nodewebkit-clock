import * as moment from "moment-timezone";
import * as React from "react";

import * as Clock from "./lib";

// "export" for use from console.
window.moment = moment;
window.React = React;
window.Clock = Clock;

React.render(<Clock.Clock />, document.body);
