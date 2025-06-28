import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const User = sequelize.define('User',{
    correo: { type: DataTypes.TEXT(150), allowNull: false, unique: true },
    contraseña: { type: DataTypes.TEXT(20), allowNull: false },
    usuario: { type: DataTypes.STRING(30), allowNull: false, unique: true }
});
await User.sync();