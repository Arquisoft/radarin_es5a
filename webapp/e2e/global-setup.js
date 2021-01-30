const { setup: setupDevServer } = require("jest-dev-server")
module.exports = async () => {
    await setupDevServer([
    {
        command: 'node start-db.js',
        launchTimeout: 100000,
        debug:true,
        port: 27017,
    },
    {
        command: 'node start-restapi.js',
        launchTimeout: 60000,
        debug:true,
        port: 5000,
    },
    {
        command: 'BROWSER=none npm start',
        launchTimeout: 60000,
        debug: true,
        port: 3000
    }])
}