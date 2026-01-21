import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find().lean();
  }

  create(name: string) {
    return this.userModel.create({ name });
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
