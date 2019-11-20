import { Model, DataTypes } from 'sequelize';
import connections from '../../../utils/connections';

export class UserVerification extends Model {
	public readonly id: number

	public email: string

	public code: string

	public expiredDate: Date

	public createdDate?: Date | null

    public createdId?: number | null

    public updatedDate?: Date | null

    public updatedId?: number | null
}
UserVerification.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	code: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	email: {
		type:
        DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	createdId: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	updatedId: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	expiredDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
}, {
	tableName: 'user_verification',
	sequelize: connections('postgres'),
	createdAt: 'createdDate',
	updatedAt: 'updatedDate',
	freezeTableName: true,
});

export default UserVerification;
