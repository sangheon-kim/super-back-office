import express from 'express';
import AppController from '../controllers/App.controller';

class AppRouter {
  router: express.Router;
  controller: typeof AppController;

  constructor(controller: typeof AppController) {
    this.router = express.Router();
    this.controller = controller;
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getApp);
    this.router.get('/:appId', this.controller.getOneTest);
  }
}

export default new AppRouter(AppController).router;
