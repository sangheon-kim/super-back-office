import {
  Model,
  DataTypes,
  Association,
  InferAttributes,
  InferCreationAttributes,
  HasManyCreateAssociationMixin,
} from 'sequelize';
import sequelize from 'src/utils/ORM';
import Item from 'src/models/Item/Item.model';

class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
  declare projectId: string;
  declare description: string;
  declare createItem: HasManyCreateAssociationMixin<Item>;

  declare static associations: {
    items: Association<Project, Item>;
  };
}

Project.init(
  {
    projectId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      primaryKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    description: DataTypes.TEXT,
  },
  {
    tableName: 'projects',
    modelName: 'Project',
    sequelize,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

export default Project;
