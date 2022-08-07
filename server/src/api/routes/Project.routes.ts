import express from 'express';
import ProjectController from 'src/api/controllers/Project.controller';
import dtoValidationMiddleware from '../common/middlewares/dtoValidation,middlewares';
import { CreateProjectDto, UpdateProjectDto } from '../dto/Project.dto';

class ProjectRouter {
  router: express.Router;
  path: string = '/projects';
  constructor(private controller: typeof ProjectController) {
    this.router = express.Router();
    this.init();
  }

  private init() {
    this.router.get(`${this.path}/`, this.controller.getProjects);
    this.router.post(
      `${this.path}/`,
      dtoValidationMiddleware(CreateProjectDto),
      this.controller.createProject
    );
    this.router.get(`${this.path}/:projectId`, this.controller.getProject);
    this.router.put(
      `${this.path}/:projectId`,
      dtoValidationMiddleware(UpdateProjectDto),
      this.controller.updateProject
    );
    this.router.delete(`${this.path}/:projectId`, this.controller.deleteProject);
  }
}

export default new ProjectRouter(ProjectController).router;
