import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1653076389213 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.query(
      'ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"',
    );
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.query(
      'ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"',
    );
  }
}
