import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739849896461 implements MigrationInterface {
    name = 'Migration1739849896461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('PENDING', 'DELIVERED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "totalAmount" double precision NOT NULL, "totalItems" numeric NOT NULL, "status" "public"."order_status_enum" NOT NULL DEFAULT 'PENDING', "paid" boolean DEFAULT false, "paidAt" date, "clientId" character varying(100), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" character varying NOT NULL, "quantity" numeric NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
    }

}
