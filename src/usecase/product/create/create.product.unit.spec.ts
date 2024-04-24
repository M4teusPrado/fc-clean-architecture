import CreateProducUseCase from "./create.product.usecase";


const input = {
    type: "a",
    name: "Product A",
    quantity: 1,
    price: 1,
  };

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const customerCreateUseCase = new CreateProducUseCase(productRepository);

        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });
}); 
