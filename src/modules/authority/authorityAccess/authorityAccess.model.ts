import { Model, DataTypes } from "sequelize";
import connections from "./../../../utils/connections";
import Module from "./../../module/module.model";
import Authority from "./../authority.model";
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
        allowNull: false,
        // references: {
        //     model: Module,
        //     key: 'id'
        // }
    },
    authorityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: Authority,
        //     key: 'id'
        // }
    }
}, {
    tableName: 'authority_access',
    sequelize: connections('boilerplate'),
    createdAt: 'createdDate',
    updatedAt: 'updatedDate',
    freezeTableName: true
})


// AuthorityAccess.sync({
//     force: true
// }).then((result) => {
//     global.logger.info('Table authority access has been synced')
// }).catch((err) => {
//     global.logger.error('Table authority access failed to sync')
//     console.error(err)
// });

export default AuthorityAccess
