const App = require("./src/app");
const env = require("./src/env");

App.start().listen(env.PORT, () => {
  console.log(`\u{1F607}: Server has started at port: ${env.PORT}`);
});
