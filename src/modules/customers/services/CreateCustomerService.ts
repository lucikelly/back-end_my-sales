import AppError from "@shared/errors/AppError";
import { customerRepository } from "../infra/database/repositories/CustomerRepositories";
import { Customer } from "../infra/database/entities/Customer";

interface ICreateCustomer {
  name: string;
  email: string;
}

export  default class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Error address already used.', 409);
    }

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;
 }
}