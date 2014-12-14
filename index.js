import * as React from "react";

import * as Clock from "./lib";

window.Clock = Clock; // "export" for use from console.

React.render(<Clock.Clock />, document.body);
