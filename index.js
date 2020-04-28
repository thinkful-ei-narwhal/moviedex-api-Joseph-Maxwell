const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();



app.listen(8080, () => console.log('Server listening on port 8080...'))