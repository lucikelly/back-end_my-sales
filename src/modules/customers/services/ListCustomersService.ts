import { Customer } from "../database/entities/Customer";
import { customerRepository } from "../database/repositories/CustomerRepositories";

export default class ListCustomersService {
  async execute(): Promise<Customer[]> {
    const customers = customerRepository.find();
    return customers

  }
}