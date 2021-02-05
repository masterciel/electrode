/**
 * A simple configuration to setup fastify to serve routes for the
 * Electrode X webapp.
 *
 * To support config composition base on environment, checkout these:
 *
 * 1. https://www.npmjs.com/package/electrode-confippet
 * 2. https://www.npmjs.com/package/config
 *
 */
export const config = {
  connection: {
    host: process.env.HOST || "localhost",
    // The env APP_SERVER_PORT allows Electrode X to control app's listening port during dev
    // to serve both static assets and app under a unified proxy port
    port: parseInt(process.env.APP_SERVER_PORT || process.env.PORT || "3000")
  },
  plugins: {
    /**
     * Register the dev support plugin
     */
    "@xarc/app-dev": {
      priority: -1,
      enable: Boolean(process.env.WEBPACK_DEV)
    }
  },
  // don't start fastify server automatically so app can setup routes
  deferStart: true
};
