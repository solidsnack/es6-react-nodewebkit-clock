import * as React from "react/addons";
import * as moment from "moment-timezone";

import tz from "./tz";


class TZChooser {
  getDefaultProps() {
    return {name: "tzchooser"};
  }
  getInitialState() {
    return {tz: tz()};
  }
  handleChange(event) {
    this.setState({tz: event.target.value});
  }
  render() {
    var zones = moment.tz.names(),
        zoneTemplate = (zoneName) => {
          return <option key={zoneName} value={zoneName}>{zoneName}</option>
        };
    return <select className="tzchooser"
                   onChange={this.handleChange}
                   value={this.state.tz}
                   name={this.props.name}
                   id={this.props.name}>
             {zones.map(zoneTemplate)}
           </select>
  }
//  shouldComponentUpdate(nextProps, nextState) {
//    console.log(JSON.stringify(this.props) + " " + JSON.stringify(nextProps));
//    console.log("this.props === nextProps", this.props === nextProps);
//    console.log(JSON.stringify(this.state) + " " + JSON.stringify(nextState));
//    console.log("this.state === nextState", this.state === nextState);
//    return this.state.tz !== nextState.tz;
//  }
}

TZChooser.mixins = [React.addons.PureRenderMixin];

export default React.createClass(TZChooser.prototype);
