import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('remote-configuration', 'root', '1234', {
  port: 3307,
  host: 'localhost',
  dialect: 'mysql',
})

export default sequelize
