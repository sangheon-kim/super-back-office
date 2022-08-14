import HttpException from 'src/api/common/exceptions/http.exception';
import { CreateItemDto, ResponseItemDto, UpdateItemDto } from 'src/api/dto/Item.dto';
import Project from '../Project/Project.model';

import Item from './Item.model';

class ItemRepository {
  constructor() {
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async findAll(project: Project): Promise<Item[]> {
    try {
      const items = await project?.getItems();

      return items || [];
    } catch (err) {
      throw new HttpException(500, JSON.stringify(err));
    }
  }

  async findById(project: Project, key: string): Promise<Item | null> {
    try {
      const items =
        (await project.getItems({
          where: {
            key,
          },
        })) || [];

      return items[0] || null;
    } catch (err) {
      throw new HttpException(500, JSON.stringify(err));
    }
  }

  async create(project: Project, item: CreateItemDto): Promise<ResponseItemDto> {
    try {
      const result = await project?.createItem({ ...item, projectId: project.projectId });

      if (!result) throw new Error('create Error');
      return result;
    } catch (err) {
      throw new HttpException(500, JSON.stringify(err));
    }
  }

  async update(project: Project, key: string, body: UpdateItemDto): Promise<boolean | null> {
    try {
      const items =
        (await project.getItems({
          where: {
            key,
          },
        })) || [];

      if (!items[0]) throw new HttpException(404, 'No Item');

      // const item = items[0];

      for (let item of items) {
        console.log({
          item,
        });
        // await item.update({ ...body });
        item.key = body.key;
        item.value = body.value;
        await item.update({ ...body });
      }

      // console.log({
      //   key: body.key,
      // });

      // // await item.update({ key: body.key, value: body.value });
      // console.log({ items, item, body });
      // await item.save();
      // console.log(items);

      return true;
    } catch (err) {
      throw new HttpException(500, JSON.stringify(err));
    }
  }

  async delete(project: Project, key: string): Promise<boolean | null> {
    try {
      const items =
        (await project.getItems({
          where: {
            key,
          },
        })) || [];

      if (!items[0]) throw new HttpException(404, 'No Item');

      await items[0].destroy();

      return true;
    } catch (err) {
      throw new HttpException(500, JSON.stringify(err));
    }
  }
}

export default ItemRepository;
