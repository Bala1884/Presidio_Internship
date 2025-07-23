import db from '../models';
import { Model, ModelStatic } from 'sequelize';

const User = db.User as ModelStatic<Model>;

export const createUser = async (data: any) => await User.create(data);
export const findUserByEmail = async (email: string) => await User.findOne({ where: { email } });
export const findUserById = async (id: number) => await User.findByPk(id);
export const getAllUsers = async () => await User.findAll();
export const updateUser = async (user: any, data: any) => await user.update(data);
export const deleteUser = async (user: any) => await user.destroy();