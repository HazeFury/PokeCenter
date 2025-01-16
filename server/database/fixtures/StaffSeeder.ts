import AbstractSeeder from "./AbstractSeeder";

import argon2 from "argon2";
import { hashingOptions } from "../../src/modules/auth/authActions";
import { staffData } from "../datas";

class StaffSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "staff",
      truncate: true,
    });
  }

  async run() {
    for (let i = 0; i < staffData.length; i += 1) {
      const newPokemonToHeal = {
        name: staffData[i].name,
        origin: staffData[i].origin,
        image: staffData[i].image,
        favorite_type: staffData[i].favorite_type,
        email: staffData[i].email,
        hashed_password: await argon2.hash(
          staffData[i].hashed_password,
          hashingOptions,
        ),
      };

      this.insert(newPokemonToHeal);
    }
  }
}

export default StaffSeeder;
