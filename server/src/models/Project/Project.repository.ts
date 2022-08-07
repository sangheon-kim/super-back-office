import HttpException from 'src/api/common/exceptions/http.exception';
import { CreateProjectDto, UpdateProjectDto } from 'src/api/dto/Project.dto';
import Project from 'src/models/Project/Project.model';

class ProjectRepository {
  constructor() {
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async findAll(): Promise<Project[]> {
    const projects = await Project.findAll();
    return projects;
  }

  async findById(projectId: string): Promise<Project | null> {
    const project = await Project.findByPk(projectId);

    return project;
  }

  async create(project: CreateProjectDto): Promise<Project> {
    try {
      const newProject = await Project.create(project);

      return newProject;
    } catch (err) {
      throw new HttpException(500, JSON.stringify(err));
    }
  }

  async update(projectId: string, project: UpdateProjectDto): Promise<boolean | null> {
    try {
      await Project.update(project, { where: { projectId } });

      return true;
    } catch (err) {
      console.log('updateError', { err });
      throw new HttpException(500, JSON.stringify(err));
    }
  }

  async delete(projectId: string): Promise<boolean | null> {
    const deletedProject = await Project.destroy({
      where: { projectId },
    });

    return deletedProject ? true : false;
  }
}

export default ProjectRepository;
