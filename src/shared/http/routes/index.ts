import { Router } from 'express';

const routes = Router();

routes.get('/health', (_request, response) => {
  return response.json({ mensagem: 'Olá dev!!' });
});

export default routes;
