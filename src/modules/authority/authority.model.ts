import { Model, DataTypes } from "sequelize";
import connections from "./../../utils/connections";
// import { Module } from "./../module";

export class Authority extends Model {
    public readonly id:number
    public name:string
    public description:string
    public createdDate:Date | null
    public createdId:number | null
    public updatedDate:Date | null
    public updatedId:number | null
}

Authority.init({
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
    createdId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    updatedId:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'authority',
    sequelize: connections('boilerplate'),
    createdAt: 'createdDate',
    updatedAt: 'updatedDate',
})
Authority.sync({
    force: true
}).then(() => global.logger.info(`Table ${Authority.tableName} has been created`)).catch(error => {
    global.logger.error(error)
})

export default Authority
