import express from "express";
import { Order, OrderStore } from "../models/order";
import jwt from "jsonwebtoken";

const store = new OrderStore();
const tokenSecret = process.env.TOKEN_SECRET as string;

const create = async (req: express.Request, res: express.Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, tokenSecret);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }

  try {
    const order: Order = {
      status: req.body.status,
      uid: req.body.uid,
    };
    const newOrder = await store.create(req.body.uid);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: express.Request, res: express.Response) => {
  const quantity: number = parseInt(req.body.quantity);
  const orderId: number = parseInt(req.params.id);
  const productId: number = parseInt(req.body.productId);

  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, tokenSecret);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }

  try {
    const added = await store.addProduct(quantity, orderId, productId);
    res.json(added);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.post("/orders", create);
  app.post("/orders/:id/products", addProduct);
};

export default orderRoutes;
