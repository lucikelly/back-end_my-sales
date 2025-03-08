import AppError from "@shared/errors/AppError";
import { Customer } from '../infra/database/entities/Customer';
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositories";
import { inject, injectable } from "tsyringe";
import { IShowCustomer } from "../domain/models/IShowCustomer";


@injectable()

export default class ShowCustomersService {
  constructor(
    @inject('CustomersRepository')
    private readonly customerRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found. ', 404);
    }

    return customer;
  }
}