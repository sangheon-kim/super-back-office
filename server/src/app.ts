import express from 'express'
import path from 'path'
import sequelize from 'src/utils/ORM'
import Item from './models/Item'
import Project from './models/Project'

const app = express()
const PORT = process.env.PORT || 4000
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '..', 'public')))

Item.belongsTo(Project, {
  targetKey: 'projectId',
  foreignKey: 'projectId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Project.hasMany(Item, {
  sourceKey: 'projectId',
  foreignKey: 'projectId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: 'items',
})
;(async () => {
  try {
    await sequelize.sync({ force: true })

    await Project.create({
      projectId: 'test',
      description: '테스트입니다.',
    })

    await Project.create({
      projectId: 'test2',
      description: '테스트입니다2',
    })

    const project = await Project.findByPk('test')
    const project2 = await Project.findByPk('test2')
    await project?.createItem({
      key: 'testItem',
      value: '{age: 5}',
      projectId: project.projectId,
    })
    await project2?.createItem({
      key: 'testItem',
      value: '{age: 16}',
      projectId: project2.projectId,
    })

    app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))
  } catch (error) {
    console.error(error)
  }
})()
