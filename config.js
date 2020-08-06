// require('@babel/register')({
//   presets: ['@babel/preset-env'],
// });

// // Import the rest of our application.
// module.exports = require('./app.js');

require = require('esm')(module /*, options*/);
module.exports = require('./app.js');
