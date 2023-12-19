import express from 'express';
const app = express();
import configRoutes from './routes/index.js';

app.use(express.json());
app.use(express.urlencoded({extended: true}));

configRoutes(app);

app.listen(3030, () => {
    console.log('Server is running...');
});