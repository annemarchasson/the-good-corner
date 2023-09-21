import {DataSource} from "typeorm";

export default new DataSource ({
    type: "sqlite",
    database: "../../good_corner_db.sqlite",
    synchronize: true,
    logging: true,
    entities: ["src/entities/*.ts"],
})
