if (typeof global !== "undefined" && !global.es6NodeWebKitClockApp) {
  global.es6NodeWebKitClockApp = true;
  window.location.href = "./index.html";
  // These are needed to allow React to load (even in the window...)
  global.document = window.document;
  global.navigator = window.navigator;
}
