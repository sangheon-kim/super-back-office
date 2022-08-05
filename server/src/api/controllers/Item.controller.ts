import { NextFunction, Request, Response } from 'express';
import Item from 'src/models/Item/Item.model';
import ItemRepository from 'src/models/Item/Item.repository';

class ItemController {
  constructor(private itemRepository: ItemRepository) {}
  async getItems(_: Request, res: Response, next: NextFunction) {
    try {
      const items = await this.itemRepository.findAll();
      res.json(items);
    } catch (err) {
      next(err);
    }
  }
  async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const item = await this.itemRepository.findById(id);
      res.json(item);
    } catch (err) {
      next(err);
    }
  }
  async createItem(req: Request, res: Response, next: NextFunction) {
    const { key, value, projectId } = req.body;
    try {
      const item = await this.itemRepository.create({ key, value, projectId } as Item);

      res.json(item);
    } catch (err) {
      next(err);
    }
  }
  async updateItem(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const result = await this.itemRepository.update(id, req.body as Item);
      if (!result) throw new Error('No Item');
      res.json(true);
    } catch (err) {
      next(err);
    }
  }
  async deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.itemRepository.delete(id);
      if (!result) throw new Error('No Item');
      res.json(true);
    } catch (err) {
      next(err);
    }
  }
}

export default new ItemController(new ItemRepository());
