import { Model, DataTypes } from "sequelize";
import connections from "./../../utils/connections";
import UserAuthority from "./../user/userAuthority/userAuthority.model";

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
    freezeTableName: true
})

Authority.hasMany(UserAuthority,{
    foreignKey: 'authorityId',
    sourceKey: 'id',
    // as: ' Authority'
})

export default Authority
