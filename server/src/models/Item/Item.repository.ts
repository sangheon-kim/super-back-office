import Item from './Item.model';

class ItemRepository {
  constructor() {}

  async findAll(): Promise<Item[]> {
    const items = await Item.findAll();
    return items;
  }

  async findById(id: string): Promise<Item | null> {
    const item = await Item.findByPk(id);

    return item;
  }

  async create(item: Item): Promise<Item> {
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
