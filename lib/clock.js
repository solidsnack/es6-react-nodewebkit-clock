import * as React from "react";
import * as moment from "moment-timezone";

import TimeInput from "./time-input";
import TZChooser from "./tz-chooser";
import tz from "./tz";


class Clock {
  getInitialState() {
    return {tz: tz(), t: moment(), format: "YYYY-DD-MM HH:mm:ss"};
  }
  handleTZChange(tzNew) {
    this.setState({tz: tzNew})
  }
  tick() {
    var now = new Date(),
        millis = now.getTime() % 1000,
        justAfterTheNextSecond = 2 + (1000 - millis);
    if (this.timer) clearTimeout(this.timer);
    this.timer = setInterval(() => {
      this.setState({t: moment()});
      this.tick();
    }, justAfterTheNextSecond);
  }
  render() {
    this.tick();
    var t = this.state.t.tz(this.state.tz).format(this.state.format);
    return <div className="clock">
             <span>{t}</span>
             <span><TZChooser onChange={this.handleTZChange} /></span>
             <span><TimeInput /></span>
           </div>
  }
}

export default React.createClass(Clock.prototype);
