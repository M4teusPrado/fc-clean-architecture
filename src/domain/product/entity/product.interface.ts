export default interface ProductInterface {
  changePrice(price: number): unknown;
  changeName(name: string): void;
  get id(): string;
  get name(): string;
  get price(): number;
}
