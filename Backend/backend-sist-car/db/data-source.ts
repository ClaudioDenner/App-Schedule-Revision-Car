/* eslint-disable */
import { DataSource } from 'typeorm';



const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'scheduleCar',
  migrations: [`${__dirname}/migrations/**/*.ts`],
  entities:["src/**/*entity{.ts,.js}"],
});

export default dataSource;
