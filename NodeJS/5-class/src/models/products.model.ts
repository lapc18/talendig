import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/db';
import { User } from "./user.model";

export class Product extends Model {
    public id!: string;
    public name!: string;
    public description!: String;
    public price!: number;
    public stock: number = 0;
}

Product.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    stock: { type: DataTypes.FLOAT, allowNull: false },
},
{
    sequelize, modelName: 'Product'
});

User.hasMany(Product, { foreignKey: 'userId', onDelete: 'CASCADE' });
Product.belongsTo(User, { foreignKey: 'userId' });