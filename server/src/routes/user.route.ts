import { FastifyInstance, FastifyRequest } from 'fastify';
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  refreshAccessToken,
  logout,
} from '../controllers/user.controller';

export async function userRouter(app: FastifyInstance) {
  app.post('/register', registerUser);
  app.post('/login', (req, reply) => loginUser(req, reply, app));
  app.post('/refresh-token', ( req: FastifyRequest<{ Body: { refreshToken: string; userId: string } }>,reply)=>refreshAccessToken(req,reply,app));
  app.post('/logout', (req: FastifyRequest<{ Body: { refreshToken: string } }>, reply) => logout(req, reply, app));
  app.get('/', getAllUsers);
  app.get('/:id', getUserById);
  app.put('/:id', updateUser);
  app.delete('/:id', deleteUser);
}

//TODO- Folder structure vechi routes varum 
//Migration and seeders
//mermaid diagram or lucid chart add pannanum fastify setup and db design