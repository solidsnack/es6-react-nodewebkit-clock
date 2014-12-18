import * as React from "react";
import * as moment from "moment-timezone";

import TZChooser from "./tz-chooser";
import tz from "./tz";


class Clock {
  getDefaultProps() {
    return {tz: tz()};
  }
  getInitialState() {
    return {t: moment(), format: "YYYY-DD-MM HH:mm:ss"};
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
    var tz = this.refs.tz ? this.refs.tz.state.tz : this.props.tz,
        t = this.state.t.tz(tz).format(this.state.format);
    return <div className="clock">
             <span>{t}</span>
             <span><TZChooser ref="tz" /></span>
           </div>
  }
}

export default React.createClass(Clock.prototype);
