import User from 'src/models/User/User.model';

class UserRepository {
  constructor() {}

  async findAll(): Promise<User[]> {
    const users = await User.findAll();
    return users;
  }

  async findById(id: string): Promise<User | null> {
    const user = await User.findByPk(id);

    return user;
  }

  async create(user: User): Promise<User> {
    const newUser = await User.create(user);

    return newUser;
  }

  async update(userId: string, user: User): Promise<boolean | null> {
    const updatedUser = await User.update(user, {
      where: { userId },
    });

    return updatedUser ? true : false;
  }

  async delete(userId: string): Promise<boolean | null> {
    const deletedUser = await User.destroy({
      where: { userId },
    });

    return deletedUser ? true : false;
  }
}

export default UserRepository;
