import client from "../database";
import bcrypt from "bcrypt";

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.BCRYPT_PASSWORD as string;

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  passworddigest: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const connect = await client.connect();
      const sql = "SELECT*FROM users";
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get user information. ERROR: ${err}`);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const connect = await client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get information about user with id ${id}. ERROR: ${err}`
      );
    }
  }

  async create(u: User): Promise<User> {
    try {
      const connect = await client.connect();
      const sql =
        "INSERT INTO users (firstname, lastname, passworddigest) VALUES ($1, $2, $3) RETURNING *";
      const hash = bcrypt.hashSync(
        u.passworddigest + pepper,
        parseInt(saltRounds)
      );
      const result = await connect.query(sql, [u.firstname, u.lastname, hash]);
      const user = {
        id: result.rows[0].id,
        firstname: result.rows[0].firstname,
        lastname: result.rows[0].lastname,
        passworddigest: result.rows[0].passworddigest,
      };
      connect.release();
      return user;
    } catch (err) {
      throw new Error(`Could not create a new user. ERROR: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const connect = await client.connect();
    const sql = "SELECT passworddigest FROM users WHERE username=($1)";
    const result = await connect.query(sql, [username]);

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + pepper, user.passworddigest)) {
        return user;
      }
    }

    return null;
  }
}
