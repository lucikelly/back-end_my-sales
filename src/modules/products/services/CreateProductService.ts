import AppError from "@shared/errors/AppError";
import { Product } from '../infra/database/entities/Product';
import { productsRepositories } from "../infra/database/repositories/ProductsRepositories";
import RedisCache from "@shared/cache/RedisCache";


interface iCreateProduct {
  name: string,
  price: number,
  quantity: number

}

export default class CreateProductService {
  async execute({ name, price, quantity }: iCreateProduct): Promise<Product> {
    const redisCache = new RedisCache();

    const productExists = await productsRepositories.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 409)
    }

    const product = productsRepositories.create({
      name,
      price,
      quantity
    });

    await redisCache.invalidate('api-mysales-PRODUCT_LIST');

    await productsRepositories.save(product)

    return product
  }
}