import express from 'express';
import ItemController from 'src/api/controllers/Item.controller';

class ItemRouter {
  router: express.Router;
  path: string = '/projects/:projectId/items';
  constructor(private controller: typeof ItemController) {
    this.router = express.Router();
    this.init();
  }

  private init() {
    this.router.get(`${this.path}/`, this.controller.getItems);
    this.router.get(`${this.path}/:itemId`, this.controller.getItem);
    this.router.post(`${this.path}/`, this.controller.createItem);
    this.router.put(`${this.path}/:itemId`, this.controller.updateItem);
    this.router.delete(`${this.path}/:itemId`, this.controller.deleteItem);
  }
}

export default new ItemRouter(ItemController).router;
