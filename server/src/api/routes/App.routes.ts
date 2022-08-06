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
    /**
     * @swagger
     * paths:
     *  /:
     *    get:
     *      summary: "Hello World!",
     *      description: "초기 페이지"
     * tags:
     *  name: App
     *  description: Index
     */
    this.router.get('/', this.controller.getApp);
  }
}

export default new AppRouter(AppController).router;
