import {
  Model,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import sequelize from 'src/utils/ORM'
import Project from 'src/models/Project'

class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
  declare key: string
  declare value: string
  declare projectId: ForeignKey<Project['projectId']>
}

Item.init(
  {
    key: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
    },
    projectId: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
  },
  {
    tableName: 'items',
    modelName: 'Item',
    sequelize,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false,
  }
)

export default Item
