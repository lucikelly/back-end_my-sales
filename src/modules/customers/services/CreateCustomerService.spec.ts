import AppError from "@shared/errors/AppError";
import { customerMock } from "../domain/factories/customerFactory";
import FakeCustomersRepository from "../domain/repositories/fakes/FakeCustomerRepositories";
import CreateCustomerService from "./CreateCustomerService";


let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  })
  it('should be able to create a new customer', async () => {


    const customer = await createCustomer.execute(customerMock);

    expect(customer).toHaveProperty('id');
    expect(customer.name).toBe('Caleb');
    expect(customer.email).toBe('caleb@gmail.com');


  });

  it('should not be able to create a new customer with email that already in use', async () => {

    await createCustomer.execute(customerMock);


    await expect(
      createCustomer.execute(customerMock)).rejects.toBeInstanceOf(AppError);
  });
});