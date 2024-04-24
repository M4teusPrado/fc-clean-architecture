import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";



describe("Test create product use case", () => {
    

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


    it("should create a product", async () => {
        const productRepository = new ProductRepository();

        const product = new Product("123", "Product", 123)

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "123" } });

        expect(productModel.id).toBe("123");
        expect(productModel.name).toBe("Product");
        expect(productModel.price).toBe(123);

    });

   
})