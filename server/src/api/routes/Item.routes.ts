import express from 'express';
import ItemController from 'src/api/controllers/Item.controller';

class ItemRouter {
  router: express.Router;
  constructor(private controller: typeof ItemController) {
    this.router = express.Router();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getItems);
    this.router.get('/:id', this.controller.getItem);
    this.router.post('/', this.controller.createItem);
    this.router.put('/:id', this.controller.updateItem);
    this.router.delete('/:id', this.controller.deleteItem);
  }
}

export default new ItemRouter(ItemController);
