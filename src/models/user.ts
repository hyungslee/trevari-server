// src/models/user.ts

import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';

export interface UserAddModel {
    email: string;
    password: string;
    name: string;
    phoneNumber:number
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
    name: string;
    phoneNumber:number
}

export interface UserViewModel {
  id: number;
  email: string;
}

export const User = sequelize.define<UserModel, UserAddModel>('user', {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  phoneNumber: Sequelize.INTEGER,
  name: Sequelize.STRING,

});
