/*
  Warnings:

  - You are about to drop the column `product_variation_ids` on the `Order` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "product_variation_ids",
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "expected_delivery_date" TIMESTAMP(3);
