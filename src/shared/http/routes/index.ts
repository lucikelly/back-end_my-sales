import productsRouter from '@modules/products/Routes/ProductRoutes';
import { Router } from 'express';

const routes = Router();

routes.get('/health', (_request, response) => {
  return response.json({ mensagem: 'Olá dev!!' });
});

routes.use('/products', productsRouter)
export default routes;
