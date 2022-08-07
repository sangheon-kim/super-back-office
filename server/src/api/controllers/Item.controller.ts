import { NextFunction, Request, Response } from 'express';
import Item from 'src/models/Item/Item.model';
import ItemRepository from 'src/models/Item/Item.repository';

class ItemController {
  constructor(private itemRepository: ItemRepository) {
    this.getItems = this.getItems.bind(this);
    this.getItem = this.getItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  async getItems(req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params;
    try {
      const items = await this.itemRepository.findAll(projectId);
      res.send(items);
    } catch (err) {
      next(err);
    }
  }

  async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId, itemId } = req.params;
      const item = await this.itemRepository.findById(projectId, itemId);
      res.send(item);
    } catch (err) {
      next(err);
    }
  }

  async createItem(req: Request, res: Response, next: NextFunction) {
    const { projectId, itemId } = req.params;

    try {
      const item = await this.itemRepository.create(projectId, itemId, req.body);

      res.send(item);
    } catch (err) {
      next(err);
    }
  }

  async updateItem(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const result = await this.itemRepository.update(id, req.body as Item);
      if (!result) throw new Error('No Item');
      res.send(true);
    } catch (err) {
      next(err);
    }
  }
  async deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.itemRepository.delete(id);
      if (!result) throw new Error('No Item');
      res.send(true);
    } catch (err) {
      next(err);
    }
  }
}

export default new ItemController(new ItemRepository());
