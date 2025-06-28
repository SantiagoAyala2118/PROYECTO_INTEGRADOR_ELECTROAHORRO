import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve('servidor/.env')});

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

export const startDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Autenticación completada con exito');
        await sequelize.sync();
    } catch (err) {
        console.error('Error al intentar autenticar y sincronizar con la base de datos', err);
    };
};