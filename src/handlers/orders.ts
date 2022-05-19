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
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const selectOrders = async (req: express.Request, res: express.Response) => {
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
    const currentOrders = await store.selectOrders(
      req.params.id,
      req.params.active
    );
    res.json(currentOrders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.post("/orders", create);
  app.get("/orders/users/:uid/:status", selectOrders);
};

export default orderRoutes;
