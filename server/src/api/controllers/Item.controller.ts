import { NextFunction, Request, Response } from 'express';
import ItemRepository from 'src/models/Item/Item.repository';
import { CreateItemDto, UpdateItemDto } from '../dto/Item.dto';
import ProjectRepository from 'src/models/Project/Project.repository';
import HttpException from '../common/exceptions/http.exception';

class ItemController {
  constructor(
    private itemRepository: ItemRepository,
    private projectRepository: ProjectRepository
  ) {
    this.getItems = this.getItems.bind(this);
    this.getItem = this.getItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  async getItems(req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params;
    try {
      const project = await this.projectRepository.findById(projectId);

      if (!project) throw new HttpException(404, 'No Project');

      const items = await this.itemRepository.findAll(project);
      res.send({ items });
    } catch (err) {
      next(err);
    }
  }

  async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId, itemId } = req.params;
      const project = await this.projectRepository.findById(projectId);

      if (!project) throw new HttpException(404, 'No Project');

      const item = await this.itemRepository.findById(project, itemId);
      res.send({ item });
    } catch (err) {
      next(err);
    }
  }

  async createItem(req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params;
    const body: CreateItemDto = req.body;
    try {
      const project = await this.projectRepository.findById(projectId);

      if (!project) throw new HttpException(404, 'No Project');
      const item = await this.itemRepository.create(project, body);

      res.send({ item });
    } catch (err) {
      next(err);
    }
  }

  async updateItem(req: Request, res: Response, next: NextFunction) {
    const { projectId, itemId } = req.params;
    const body: UpdateItemDto = req.body;
    try {
      const project = await this.projectRepository.findById(projectId);

      if (!project) throw new HttpException(404, 'No Project');

      await this.itemRepository.update(project, itemId, body);

      res.send('OK');
    } catch (err) {
      next(err);
    }
  }
  async deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId, itemId } = req.params;
      const project = await this.projectRepository.findById(projectId);

      if (!project) throw new HttpException(404, 'No Project');

      await this.itemRepository.delete(project, itemId);

      res.send('OK');
    } catch (err) {
      next(err);
    }
  }
}

export default new ItemController(new ItemRepository(), new ProjectRepository());
