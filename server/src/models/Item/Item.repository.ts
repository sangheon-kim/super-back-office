import HttpException from 'src/api/common/exceptions/http.exception';
import ProjectRepository from '../Project/Project.repository';
import Item from './Item.model';

class ItemRepository {
  private projectRepository: ProjectRepository = new ProjectRepository();
  constructor() {
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async findAll(projectId: string): Promise<Item[]> {
    try {
      const project = await this.projectRepository.findById(projectId);

      const items = await project?.getItems();

      return items || [];
    } catch (err) {
      throw new HttpException(500, JSON.stringify(err));
    }
  }

  async findById(projectId: string, itemId: string): Promise<Item | null> {
    try {
      const items = await this.findAll(projectId);
      const item = items.filter((item) => item.key === itemId)[0] || {};

      return item;
    } catch (err) {
      throw new HttpException(500, JSON.stringify(err));
    }
  }

  async create(projectId: string, itemId: string, item: Item): Promise<Item> {
    const project = await this.projectRepository.findById(projectId);
    // await
    const newItem = await Item.create(item);

    return newItem;
  }

  async update(key: string, item: Item): Promise<boolean | null> {
    const updatedItem = await Item.update(item, {
      where: { key },
    });

    return updatedItem ? true : false;
  }

  async delete(key: string): Promise<boolean | null> {
    const deletedItem = await Item.destroy({
      where: { key },
    });

    return deletedItem ? true : false;
  }
}

export default ItemRepository;
