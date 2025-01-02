import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Staff = {
  id: number;
  name: string;
  origin: string;
  image: string;
  favorite_type: string;
};

class StaffRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from staff");

    return rows as Staff[];
  }
}

export default new StaffRepository();
