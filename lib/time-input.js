import * as React from "react";
import * as moment from "moment-timezone";

import tz from "./tz";
import TZChooser from "./tz-chooser";


class TimeInput {
  getDefaultProps() {
    return {name: "the-time"};
  }
  getInitialState() {
    console.log("TimeInput.getInitialState()");
    var theT = moment(this.props.t) || moment().utc(),
        theTZ = this.props.tz || tz(),
        theInput = theT.tz(theTZ).format("YYYY-MM-DD HH:mm:ss");
    return {t: theT, tz: theTZ, input: theInput}
  }
  handleChange({t, tz}) {
    if (t) this.setState({t});
    if (tz) {
      console.log("TimeInput.handleChange() / if (tz) {...}");
      this.setState({tz});
      this.resetInput();
    }
    if (this.props.onChange) this.props.onChange({t, tz});
  }
  resetInput() {
    this.setState({input: this.state.t.tz(this.state.tz)
                                      .format("YYYY-MM-DD HH:mm:ss")});
  }
  inputHandler(event) {
    this.setState({input: event.target.value});
  }
  keyPressHandler(e) {
    if (["enter", "return"].indexOf((e.key || "").toLowerCase()) < 0) return;
    var parsed = moment(this.state.input,
                        ["YYYY-MM-DD",
                         "YYYY-MM-DD HH:mm:ss",
                         "YYYY-MM-DD HH:mm",
                         "HH:mm:ss",
                         "HH:mm"],
                        true);
    if (parsed.isValid()) {
      console.log("TimeInput.keyPressHandler() / if (parsed.isValid()) {...}");
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
                    onKeyPress={this.keyPressHandler} />
             <TZChooser tz={this.state.tz}
                        name={this.props.name + "-tzchooser"}
                        onChange={(tz) => this.handleChange({tz})} />
           </fieldset>
  }
}

export default React.createClass(TimeInput.prototype);
