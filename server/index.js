'use strict';

import express    from 'express';
import bodyParser from 'body-parser';
import fs         from 'fs';

import api from './routes/api';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);

const port = process.env.PORT || 8080;

app.listen(port);
console.log(`I'm at http://localhost:${port}`);
