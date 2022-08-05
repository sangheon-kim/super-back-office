import Project from 'src/models/Project/Project.model';

class ProjectRepository {
  constructor() {}

  async findAll(): Promise<Project[]> {
    const projects = await Project.findAll();
    return projects;
  }

  async findById(id: string): Promise<Project | null> {
    const project = await Project.findByPk(id);

    return project;
  }

  async create(project: Project): Promise<Project> {
    const newProject = await Project.create(project);

    return newProject;
  }

  async update(projectId: string, project: Project): Promise<boolean | null> {
    const updatedProject = await Project.update(project, {
      where: { projectId },
    });

    return updatedProject ? true : false;
  }

  async delete(projectId: string): Promise<boolean | null> {
    const deletedProject = await Project.destroy({
      where: { projectId },
    });

    return deletedProject ? true : false;
  }
}

export default ProjectRepository;
