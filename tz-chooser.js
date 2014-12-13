import * as React from "react";
import * as moment from "moment-timezone";

class TZChooser {
  getDefaultProps() {
    return {name: "tzchooser"};
  }
  getInitialState() {
    return {zone: "UTC"};
  }
  handleChange(event) {
    this.setState({zone: event.target.value});
    this.props.onChange(event.target.value);
  }
  render() {
    var zones = moment.tz.names();
    var zoneTemplate = function(zoneName) {
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
