import * as React from "react";
import TZChooser from "./tz-chooser";

class Clock {
  getInitialState() {
    return {tz: "UTC"};
  }
  handleTZChange(tzNew) {
    this.setState({tz: tzNew})
  }
  render() {
    return <div className="clock">
             <TZChooser onChange={this.handleTZChange} />
             <p>{this.state.tz}</p>
           </div>
  }
}

export default React.createClass(Clock.prototype);
