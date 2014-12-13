import * as jstz from "jstimezonedetect";

var jstz = jstz.jstz || jstz; // Packaged in a weird way.

var preferredNames = {
  "America/New_York": "US/Eastern",
  "America/Chicago": "US/Central",
  "America/Denver": "US/Mountain",
  "America/Los_Angeles": "US/Pacific"
};

export default function() {
  var tz = jstz.determine().name();
  return preferredNames[tz] || tz;
}
