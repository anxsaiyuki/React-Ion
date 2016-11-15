const express = require('express');
const db = require('./config/connection');

const app = express();

require('./config/middleware')(app, express);
require('./config/routes')(app, express);
require('./config/auth')(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
