import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product",
        price: 123,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product");
    expect(response.body.price).toBe(123);
    
  });


  it("should list all product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product",
        price: 123,
      });
    expect(response.status).toBe(200);
    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Product 2",
        price: 123,
      });
    expect(response2.status).toBe(200);

    const response3 = await request(app).get("/product");
    expect(response3.status).toBe(200);
    expect(response3.body.products.length).toBe(2);
  });

});
