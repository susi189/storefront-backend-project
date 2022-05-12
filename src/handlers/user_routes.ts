import express from "express";
import { User, UserStore } from "../models/user";

const store = new UserStore();

const index = async (req: express.Request, res: express.Response) => {
  const users = await store.index();
  res.json(users);
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      passworddigest: req.body.passworddigest,
    };

    const newUser = await store.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  const user = await store.show(req.body.id);
  res.json(user);
};

const product_routes = (app: express.Application) => {
  app.get("/users", index);
  app.post("/users", create);
  app.get("/users", show);
};

export default product_routes;
