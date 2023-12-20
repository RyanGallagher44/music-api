import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import cors from 'cors';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

configRoutes(app);

app.listen(3030, () => {
    console.log('Server is running...');
});