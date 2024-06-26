import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ListProductUseCase from "./list.product.unit";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";




describe("Test find product use case", () => {
    

    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });


    it("should list all products", async () => {
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);

        const product = new Product("123", "Product", 123);
        const product2 = new Product("124", "Product 2", 124);

        await productRepository.create(product);
        await productRepository.create(product2);

        const output = await usecase.execute();

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product.id);
        expect(output.products[0].name).toBe(product.name);
        expect(output.products[0].price).toBe(product.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);


    });
})