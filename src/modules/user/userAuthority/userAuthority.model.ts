import { Model, DataTypes } from 'sequelize';
import connections from '../../../utils/connections';
import User from '../user.model';

export class UserAuthority extends Model {
    public readonly id: number

    public name: string

    public description: string

    public createdDate: Date | null

    public createdId: number | null

    public updatedDate: Date | null

    public updatedId: number | null
}

UserAuthority.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: true,
		unique: false,
	},
	createdId: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	updatedId: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},

	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: 'id',
		},
	},
	authorityId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		// references: {
		//     model: Authority,
		//     key: 'id'
		// }
	},
}, {
	tableName: 'user_authority',
	sequelize: connections('boilerplate'),
	createdAt: 'createdDate',
	updatedAt: 'updatedDate',
	freezeTableName: true,
});

export default UserAuthority;
