const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/integration/RegressionCases/*.js",
    env: {
      environment: "uat",
      MAILSLURP_API_KEY: "86d42f01055e74990a2861dcdd4cb4fa2be924e8889ce385f80ba8e184c440f2",
    },
    setupNodeEvents(on, config) {
    },
  },
});
