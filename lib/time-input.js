import * as React from "react";
import * as moment from "moment-timezone";

import tz from "./tz";
import TZChooser from "./tz-chooser";


class TimeInput {
  getDefaultProps() {
    return {name: "the-time"};
  }
  getInitialState() {
    var theT = moment(this.props.t) || moment().utc(),
        theTZ = this.props.tz || tz(),
        theInput = theT.tz(theTZ).format("YYYY-MM-DD HH:mm:ss");
    return {t: theT, tz: theTZ, input: theInput}
  }
  handleChange({t, tz}) {
    if (t) this.setState({t});
    if (tz) {
      this.setState({tz});
      this.resetInput({t, tz});
    }
    if (this.props.onChange) this.props.onChange({t, tz});
  }
  resetInput({t, tz}) {
    var t = t || this.state.t,
        tz = tz || this.state.tz;
    this.setState({input: t.tz(tz).format("YYYY-MM-DD HH:mm:ss")});
  }
  inputHandler(event) {
    this.setState({input: event.target.value});
  }
  keyPressHandler(event) {
    var key = (event.key || "").toLowerCase();
    if (["enter", "return"].indexOf(key) < 0) return;
    var parsed = parseTime(event.target.value);
    if (parsed.isValid()) {
      this.refs.input.getDOMNode().setCustomValidity("");
      this.handleChange({t: parsed.tz(this.state.tz)});
    } else {
      var msg = "Invalid date format (please use YYYY-MM-DD HH:mm:ss)";
      this.refs.input.getDOMNode().setCustomValidity(msg);
    }
  }
  render() {
    return <fieldset>
             <input type="text"
                    ref="input"
                    name={this.props.name}
                    value={this.state.input}
                    onChange={this.inputHandler}
                    onKeyPress={this.keyPressHandler} />
             <TZChooser tz={this.state.tz}
                        name={this.props.name + "-tzchooser"}
                        onChange={(tz) => this.handleChange({tz})} />
           </fieldset>
  }
}

function parseTime(timeString) {
  var normedWhitespace = timeString.trim().replace(/ +/, ' '),
      patterns = [ "YYYY-MM-DD", "YYYY-MM-DD HH:mm",    "HH:mm",
                                 "YYYY-MM-DD HH:mm:ss", "HH:mm:ss"];
  return moment(normedWhitespace, patterns, true);
}

export default React.createClass(TimeInput.prototype);
