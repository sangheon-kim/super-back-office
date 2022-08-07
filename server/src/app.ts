import express from 'express';
import path, { parse } from 'path';
import sequelize from 'src/utils/ORM';
import Item from 'src/models/Item/Item.model';
import Project from 'src/models/Project/Project.model';
// Routes
import ErrorController from './api/controllers/Error.Controller';
import { specs, SwaggerUi } from 'src/utils/Swagger';

import AppRouter from 'src/api/routes/App.routes';
import ProjectRouter from './api/routes/Project.routes';
import ItemRouter from './api/routes/Item.routes';

const app = express();
const PORT = process.env.PORT || 4000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

Item.belongsTo(Project, {
  targetKey: 'projectId',
  foreignKey: 'projectId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Project.hasMany(Item, {
  sourceKey: 'projectId',
  foreignKey: 'projectId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: 'items',
});

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

// Response Interceptor
app.use('*', (req, res: express.Response, next) => {
  const oldSend = res.send;

  res.send = function (data) {
    let parseData: { [key: string]: any } = {};
    try {
      res.send = oldSend;
      parseData = JSON.parse(data);
    } catch (err) {
      parseData = data;
    } finally {
      const isSuccess = /^2/.test(res.statusCode.toString()) && !data.error;

      if (!isSuccess) {
        return res.status(res.statusCode).send(parseData);
      }
      return res.status(res.statusCode).send({
        success: isSuccess,
        status: res.statusCode,
        _data: parseData,
      });
    }
  };
  next();
});

app.use(ItemRouter);
app.use(ProjectRouter);
app.use(AppRouter);

// Error Handling
app.use(ErrorController.get404);
app.use(ErrorController.getError);

(async () => {
  try {
    await sequelize.sync({ force: false });

    const project = await Project.findByPk('test');

    const items = (await project?.getItems()) || [];

    const arr = items.map((item: any) => item.dataValues);

    // await Project.create({
    //   projectId: 'test',
    //   description: '테스트입니다.',
    // });

    // await Project.create({
    //   projectId: 'test2',
    //   description: '테스트입니다2',
    // });

    // const project = await Project.findByPk('test');
    // const project2 = await Project.findByPk('test2');
    // await project?.createItem({
    //   key: 'testItem',
    //   value: '{age: 5}',
    //   projectId: project.projectId,
    // });
    // await project2?.createItem({
    //   key: 'testItem',
    //   value: '{age: 16}',
    //   projectId: project2.projectId,
    // });

    app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
  } catch (error) {
    console.error(error);
  }
})();
