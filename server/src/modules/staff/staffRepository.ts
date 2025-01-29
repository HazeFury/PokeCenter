import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Staff = {
  id: number;
  name: string;
  origin: string;
  image: string | null;
  favorite_type: string;
  email: string;
  hashed_password: string;
};

class StaffRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from staff");

    return rows as Staff[];
  }

  async create(user: Omit<Staff, "id" | "image">) {
    const [result] = await databaseClient.query<Result>(
      "insert into staff (name, origin, favorite_type, email, hashed_password) values (?, ?, ?, ?, ?)",
      [
        user.name,
        user.origin,
        user.favorite_type,
        user.email,
        user.hashed_password,
      ],
    );

    return result.insertId;
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from staff where email = ?",
      [email],
    );

    return rows[0] as Staff;
  }

  async verifyByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select name from staff where email = ?",
      [email],
    );

    return rows[0] as Staff;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from staff where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new StaffRepository();
