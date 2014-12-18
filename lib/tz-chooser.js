import * as React from "react";
import * as moment from "moment-timezone";

import tz from "./tz";


class TZChooser {
  getDefaultProps() {
    return {name: "tzchooser"};
  }
  getInitialState() {
    return {zone: this.props.tz || tz()};
  }
  handleChange(event) {
    this.setState({zone: event.target.value});
    if (this.props.onChange) this.props.onChange(this.state.zone);
  }
  render() {
    var zones = moment.tz.names(),
        zoneTemplate = function(zoneName) {
      return <option key={zoneName} value={zoneName}>{zoneName}</option>
    };
    return <select className="tzchooser"
                   onChange={this.handleChange}
                   value={this.state.zone}
                   name={this.props.name}
                   id={this.props.name}>
             {zones.map(zoneTemplate)}
           </select>
  }
}

export default React.createClass(TZChooser.prototype);
