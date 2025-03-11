import { Customer } from "@modules/customers/infra/database/entities/Customer";
import { ICustomersRepository, Pagination } from "../ICustomersRepositories";
import { ICreateCustomer } from "../../models/ICreateUser";
import { ICustomer } from "../../models/ICustomer";


export default class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = this.customers.length + 1;
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customers[findIndex] = customer;

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    const index = this.customers.findIndex(c => c.id === customer.id);
    if (index !== -1) {
      this.customers.splice(index, 1);
    }
  }

  public async findAll(): Promise<Customer[] | undefined> {
    return this.customers;
  }

  public async findByName(name: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer as Customer | null;
  }

  public async findById(id: number): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer as Customer | null;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer as Customer | null;
  }

  findAndCount(pagination: Pagination): Promise<[ICustomer[], number]> {
    throw new Error('Method not implemented.');
  }
}