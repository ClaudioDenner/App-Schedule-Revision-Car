import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migrate1703555230934 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'name_complete',
            type: 'varchar',
            length: '70',
          },
          {
            name: 'cpf',
            type: 'varchar',
            isUnique: true,
            length: '11',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            isUnique: true,
            length: '15',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            length: '70',
            isNullable: true,
          },
          {
            name: 'gender',
            type: 'varchar',
            length: '11',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
