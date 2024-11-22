import productsRouter from '@modules/products/Routes/ProductRoutes';
import sessionsRouter from '@modules/users/routes/SessionRoutes';
import usersRouter from '@modules/users/routes/UserRoutes';
import { Router } from 'express';

const routes = Router();

routes.get('/health', (_request, response) => {
  return response.json({ mensagem: 'Olá dev!!' });
});

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
export default routes;
