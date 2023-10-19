/*
  Warnings:

  - Added the required column `userId` to the `product_meta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product_meta` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `product_meta` ADD CONSTRAINT `product_meta_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
