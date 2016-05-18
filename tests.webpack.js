// require.context(directory, useSubdirectories = false, regExp = /^\.\//)
var appContext = require.context('./app', true, /-test.js$/);
var serverContext = require.context('./server', true, /-test.js$/);

appContext.keys().forEach(appContext);
serverContext.keys().forEach(serverContext);
