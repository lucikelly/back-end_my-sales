import RedisCache from '@shared/cache/RedisCache';
import { Product } from '../infra/database/entities/Product';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';
import { SearchParams } from '@modules/users/infra/database/repositories/UsersRepository';
import { IProductPaginate } from '../domain/models/IProductPaginate';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    page,
    skip,
    take,
  }: SearchParams): Promise<IProductPaginate> {
    const redisCache = new RedisCache();

    let productsString = await redisCache.recover<string | null>(
      'api-vendas-PRODUCT_LIST',
    );
    let products: IProductPaginate | null = null;

    if (productsString) {
      try {
        products = JSON.parse(productsString) as IProductPaginate;
      } catch (error) {
        console.error('Erro ao parsear os dados do cache:', error);
        products = null;
      }
    }

    if (!products) {
      products = await this.productsRepository.findAll({ page, skip, take });
      await redisCache.save(
        'api-vendas-PRODUCT_LIST',
        JSON.stringify(products),
      );
    }

    return products;
  }
}

export default ListProductService;
