import express from 'express'

const app = express();

app.use(express.json());

import keyRouter from './routes/key.routes.js'
app.use('/api/v1',keyRouter);

export {app};