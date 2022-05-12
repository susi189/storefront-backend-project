import express from "express";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (req: express.Request, res: express.Response) => {
  const products = await store.index();
  res.json(products);
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  const product = await store.show(req.body.id);
  res.json(product);
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.post("/products", create);
  app.get("/products", show);
};

export default product_routes;
