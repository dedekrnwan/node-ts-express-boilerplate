import { Model, DataTypes } from "sequelize"    
import connections from "./../../utils/connections"
import AuthorityAccess from "./../authority/authority.model";

export class Module extends Model {
    public readonly id:number
    public name:string
    public description:string
    public url:string
    public createdDate:Date | null
    public createdId:number | null
    public updatedDate:Date | null
    public updatedId:number | null
}

Module.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false
    },
    createdId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    updatedId:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'module',
    sequelize: connections('boileplate'),
    createdAt: 'createdDate',
    updatedAt: 'updatedDate',
    freezeTableName: true
})

Module.hasMany(AuthorityAccess, {
    foreignKey: 'moduleId',
    sourceKey: 'id',
    // as: 'AuthorityAccess'
})

export default Module