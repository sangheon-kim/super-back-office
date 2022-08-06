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
    this.router.get('/:projectId', this.controller.getProject);
    this.router.post('/', this.controller.createProject);
    this.router.put('/:projectId', this.controller.updateProject);
    this.router.delete('/:projectId', this.controller.deleteProject);
  }
}

export default new ProjectRouter(ProjectController);
