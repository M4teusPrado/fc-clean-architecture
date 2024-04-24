import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProducUseCase {


    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }
    
    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product = ProductFactory.create(
            input.type,
            input.name,
            input.price
        );

        const productIntanciated = new Product(product.id, product.name, product.price);

        await this.productRepository.create(productIntanciated);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }

}