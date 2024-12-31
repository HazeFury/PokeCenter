import AbstractSeeder from "./AbstractSeeder";

import { staffData } from "../datas";

class StaffSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "staff",
      truncate: true,
    });
  }

  run() {
    for (let i = 0; i < staffData.length; i += 1) {
      const newPokemonToHeal = {
        name: staffData[i].name,
        origin: staffData[i].origin,
        image: staffData[i].image,
        favorite_type: staffData[i].favorite_type,
      };

      this.insert(newPokemonToHeal);
    }
  }
}

export default StaffSeeder;
