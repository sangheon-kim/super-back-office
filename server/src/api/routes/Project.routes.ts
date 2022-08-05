import express from 'express';
import ProjectController from '../controllers/Project.controller';

class ProjectRouter {
  router: express.Router;
  constructor(private controller: typeof ProjectController) {
    this.router = express.Router();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getProjects);
    this.router.get('/:id', this.controller.getProject);
    this.router.post('/', this.controller.createProject);
    this.router.put('/:id', this.controller.updateProject);
    this.router.delete('/:id', this.controller.deleteProject);
  }
}

export default new ProjectRouter(ProjectController);
