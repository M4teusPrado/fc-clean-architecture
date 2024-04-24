import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";




describe("Test update product use case", () => {
    

    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("Should update product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const product = new Product("123", "Product", 123);

        await productRepository.create(product);

        const input = {
            id: "123",
            name: "Product 2",
            price: 124,
        };

        const output = {
            id: "123",
            name: "Product 2",
            price: 124,
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);


    });

})