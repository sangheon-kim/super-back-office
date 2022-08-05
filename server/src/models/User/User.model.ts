import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import sequelize from 'src/utils/ORM';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  userId!: string;
  username!: string;
  bio!: string;
}

User.init(
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    bio: DataTypes.STRING(100),
  },
  {
    tableName: 'users',
    modelName: 'User',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    sequelize,
  }
);

export default User;
