import AppError from "@shared/errors/AppError";
import { customerRepository } from '../infra/database/repositories/CustomerRepositories';
import { Customer } from '../infra/database/entities/Customer';

interface IUpdateCustomer {
  id: number;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customer> {
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found. ', 404);
    }

    const customersExists = await customerRepository.findByEmail(email);

    if (customersExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}