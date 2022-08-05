import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'remote-configuration',
  process.env.MYSQL_USER_NAME || '',
  process.env.MYSQL_USER_PASSWORD || '',
  {
    port: 3306,
    host: 'mysql',
    dialect: 'mysql',
  }
);

export default sequelize;
