import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Order } from "../entities/Order";
import { Customer } from "@modules/customers/infra/database/entities/Customer";



interface ICreateOrder {
  customer: Customer;
  products: ICreateOrderProducts[];
}

export interface ICreateOrderProducts {
  product_id: string;
  price: number;
  quantity: number;
}

 const OrderRepositories = AppDataSource.getRepository(Order).extend({
  async findById(id: number): Promise<Order | null> {
    const order = await this.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    });

    return order;
  },

  async createOrder({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  },
 })

export default OrderRepositories;