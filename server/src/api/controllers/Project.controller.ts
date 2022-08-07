import { NextFunction, Request, Response } from 'express';
import Project from 'src/models/Project/Project.model';
import ProjectRepository from 'src/models/Project/Project.repository';
import { CreateProjectDto, ProjectReponseDto, UpdateProjectDto } from '../dto/Project.dto';

class ProjectController {
  constructor(private projectRepository: ProjectRepository) {
    this.getProjects = this.getProjects.bind(this);
    this.getProject = this.getProject.bind(this);
    this.createProject = this.createProject.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }
  async getProjects(_: Request, res: Response, next: NextFunction) {
    try {
      const projects = await this.projectRepository.findAll();

      res.send({ projects });
    } catch (err) {
      next(err);
    }
  }

  async getProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params;
      const project = await this.projectRepository.findById(projectId);
      res.send({ project });
    } catch (err) {
      next(err);
    }
  }
  async createProject(req: Request, res: Response, next: NextFunction) {
    const createProjectDto: CreateProjectDto = req.body;
    try {
      const project = await this.projectRepository.create(createProjectDto);

      res.send({ project });
    } catch (err) {
      next(err);
    }
  }

  async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params;
      const updateProjectDto: UpdateProjectDto = req.body;
      const result = await this.projectRepository.update(projectId, updateProjectDto);
      if (!result) throw new Error('No Project');

      res.send('OK');
    } catch (err) {
      console.log('updateProject Error', {
        err,
      });
      next(err);
    }
  }

  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params;
      const result = await this.projectRepository.delete(projectId);
      if (!result) throw new Error('No Project');

      res.send('OK');
    } catch (err) {
      next(err);
    }
  }
}

export default new ProjectController(new ProjectRepository());
