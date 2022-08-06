import { NextFunction, Request, Response } from 'express';
import Project from 'src/models/Project/Project.model';
import ProjectRepository from 'src/models/Project/Project.repository';

class ProjectController {
  constructor(private projectRepository: ProjectRepository) {}
  async getProjects(_: Request, res: Response, next: NextFunction) {
    try {
      const projects = await this.projectRepository.findAll();
      res.send(projects);
    } catch (err) {
      next(err);
    }
  }

  async getProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const project = await this.projectRepository.findById(id);
      res.send(project);
    } catch (err) {
      next(err);
    }
  }
  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await this.projectRepository.create(req.body as Project);

      res.send(project);
    } catch (err) {
      next(err);
    }
  }

  async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.projectRepository.update(id, req.body as Project);
      if (!result) throw new Error('No Project');
      res.send(true);
    } catch (err) {
      next(err);
    }
  }

  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.projectRepository.delete(id);
      if (!result) throw new Error('No Project');
      res.send(true);
    } catch (err) {
      next(err);
    }
  }
}

export default new ProjectController(new ProjectRepository());
