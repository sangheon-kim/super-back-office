import express from 'express';
import ItemController from 'src/api/controllers/Item.controller';
import dtoValidationMiddleware from '../common/middlewares/dtoValidation,middlewares';
import { CreateItemDto, UpdateItemDto } from '../dto/Item.dto';

class ItemRouter {
  router: express.Router;
  path: string = '/projects/:projectId/items';
  constructor(private controller: typeof ItemController) {
    this.router = express.Router();
    this.init();
  }

  private init() {
    this.router.get(`${this.path}/`, this.controller.getItems);
    this.router.post(
      `${this.path}/`,
      dtoValidationMiddleware(CreateItemDto),
      this.controller.createItem
    );
    this.router.get(`${this.path}/:itemId`, this.controller.getItem);
    this.router.put(
      `${this.path}/:itemId`,
      dtoValidationMiddleware(UpdateItemDto),
      this.controller.updateItem
    );
    this.router.delete(`${this.path}/:itemId`, this.controller.deleteItem);
  }
}

export default new ItemRouter(ItemController).router;
