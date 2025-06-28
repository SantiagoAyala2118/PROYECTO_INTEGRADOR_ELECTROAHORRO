import express from 'express';
import dotenv from 'dotenv';
import { userRoutes } from './src/routes/user.routes.js';
import { startDB } from './src/config/database.js';
dotenv.config();
startDB();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use('/',userRoutes);


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
});
