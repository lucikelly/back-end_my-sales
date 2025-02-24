import { Request, Response } from "express";
import ListCustomersService from "@modules/customers/services/ListCustomersService";
import ShowCustomersService from '@modules/customers/services/ShowCustomersService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import DeleteCustomersService from "@modules/customers/services/DeleteCustomersService";
import { container } from "tsyringe";


export default class CustomersControllers {
  async index(request: Request, response: Response): Promise<Response> {
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;
    const listCustomers = container.resolve(ListCustomersService);
    const customers = await listCustomers.execute(page, limit);
    return response.json(customers);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const showCustomer = container.resolve(ShowCustomersService);
    const customer = await showCustomer.execute({ id });

    return response.json(customer);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCustomer = container.resolve(CreateCustomerService);
    const customer = await createCustomer.execute({
      name,
      email,
    });

    return response.json(customer);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const id = Number(request.params.id);

    const updateCustomer = container.resolve(UpdateCustomerService,);
    const customer = await updateCustomer.execute({
      id,
      name,
      email,
    });

    return response.json(customer);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const deleteCustomer = container.resolve(DeleteCustomersService);
    await deleteCustomer.execute({ id });

    return response.status(204).json([]);

  }
}