import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import endpoint from './config/config';
import cors from 'cors';

import indexRouter from './routes/index.routes';


const app = express();
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Connecting with the database

mongoose.connect(endpoint.MONGO_URI)
 .then(() => console.log('DB Connected'))
	.catch(() => console.log('DB Connect Failed'))

app.get('/', (req, res) => {
	res.send('Hello, world!');
})

// Routes global config
app.use('/api', indexRouter);

export { app };