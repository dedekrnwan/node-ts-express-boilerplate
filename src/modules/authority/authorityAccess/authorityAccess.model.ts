import { Model, DataTypes } from "sequelize";
import connections from "./../../../utils/connections";
import User from "../../user/user.model";
import Authority from "../authority.model";
import Module from "../../module/module.model";

export class AuthorityAccess extends Model {
    public readonly id:number
    public name:string
    public description:string
    public createdDate:Date | null
    public createdId:number | null
    public updatedDate:Date | null
    public updatedId:number | null
}

AuthorityAccess.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    authope: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    authins: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    authupd: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    authdel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    authconfirm: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    authprint: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    updatedId:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    moduleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    authorityId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'authority_access',
    sequelize: connections('boilerplate'),
    createdAt: 'createdDate',
    updatedAt: 'updatedDate',
})

AuthorityAccess.sync({
    force: true
}).then(() => global.logger.info(`Table ${AuthorityAccess.tableName} has been created`)).catch(error => {
    global.logger.error(error)
})

AuthorityAccess.belongsTo(Module, {
    as: 'Module',
    foreignKey: 'moduleId'
})

AuthorityAccess.belongsTo(Authority, {
    as: 'Authority',
    foreignKey: 'authorityId'
})

export default AuthorityAccess
