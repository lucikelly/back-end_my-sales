import AppError from "@shared/errors/AppError";
import { customerRepository } from "../database/repositories/CustomerRepositories";
import { Customer } from "../database/entities/Customer";

interface IShowCustomer {
  id: number;

}

export default class ShowCustomersService {
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found. ', 404);
    }

    return customer;
  }
}