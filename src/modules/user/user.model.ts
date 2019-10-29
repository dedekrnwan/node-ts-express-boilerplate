import { BuildOptions, Model, DataTypes } from 'sequelize'
import connections from './../../utils/connections'

export class User extends Model {
    public readonly id:number
    public name:string
    public username:string | null
    public email:string
    public password?:string | null
    public birthdate?:Date | null
    public phone?:string | null
    public telephone?:string | null
    public rememberToken?:string | null
    public verificationDate?:Date | null
    public createdDate?:Date | null
    public createdId?:number | null
    public updatedDate?:Date | null
    public updatedId?:number | null
    public facebookId?:bigint | null
    public githubId?:bigint | null
    public googleId?:bigint | null
    public linkedinId?:bigint | null
    public twitterId?:bigint | null
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    email: {
        type:
        DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    rememberToken: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    verificationDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    createdId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    updatedId:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    facebookId:{
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    githubId:{
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    googleId:{
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    linkedinId:{
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    twitterId:{
        type: DataTypes.BIGINT,
        allowNull: true,
    }
}, {
    tableName: 'user',
    sequelize: connections('boilerplate'),
    createdAt: 'createdDate',
    updatedAt: 'updatedDate'
})
User.sync({
    force: true,
}).then(() => global.logger.info(`Table ${User.tableName} has been created`))

export default User