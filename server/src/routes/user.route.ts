import { FastifyInstance } from 'fastify';
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';

export async function userRouter(app: FastifyInstance) {
  app.post('/register', registerUser);
  app.post('/login', (req, reply) => loginUser(req, reply, app));
  app.get('/', getAllUsers);
  app.get('/:id', getUserById);
  app.put('/:id', updateUser);
  app.delete('/:id', deleteUser);
}

//TODO- Folder structure vechi routes varum 
//Migration and seeders
//mermaid diagram or lucid chart add pannanum fastify setup and db design