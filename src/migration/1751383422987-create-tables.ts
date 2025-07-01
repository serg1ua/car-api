import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1751383422987 implements MigrationInterface {
  name = 'CreateTables1751383422987';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "manufacturer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying, "siret" integer, CONSTRAINT "UQ_a4687de45b74542072a2656b77d" UNIQUE ("name"), CONSTRAINT "PK_81fc5abca8ed2f6edc79b375eeb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "car" ("id" SERIAL NOT NULL, "price" double precision NOT NULL, "firstRegistrationDate" bigint NOT NULL, "manufacturerId" integer, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "owner" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "purchaseDate" bigint NOT NULL, "carId" integer, CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "car" ADD CONSTRAINT "FK_219df163feb468a934c3a7b24ca" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "owner" ADD CONSTRAINT "FK_732957c1d4ade78a38331490d76" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "owner" DROP CONSTRAINT "FK_732957c1d4ade78a38331490d76"`,
    );
    await queryRunner.query(
      `ALTER TABLE "car" DROP CONSTRAINT "FK_219df163feb468a934c3a7b24ca"`,
    );
    await queryRunner.query(`DROP TABLE "owner"`);
    await queryRunner.query(`DROP TABLE "car"`);
    await queryRunner.query(`DROP TABLE "manufacturer"`);
  }
}
