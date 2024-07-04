-- DropForeignKey
ALTER TABLE "class_room_list" DROP CONSTRAINT "class_room_list_classRoomId_fkey";

-- DropForeignKey
ALTER TABLE "class_room_list" DROP CONSTRAINT "class_room_list_studentId_fkey";

-- DropForeignKey
ALTER TABLE "class_rooms" DROP CONSTRAINT "class_rooms_coordId_fkey";

-- AlterTable
ALTER TABLE "class_rooms" ALTER COLUMN "coordId" DROP NOT NULL,
ALTER COLUMN "coordId" SET DEFAULT NULL;

-- AddForeignKey
ALTER TABLE "class_rooms" ADD CONSTRAINT "class_rooms_coordId_fkey" FOREIGN KEY ("coordId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_room_list" ADD CONSTRAINT "class_room_list_classRoomId_fkey" FOREIGN KEY ("classRoomId") REFERENCES "class_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_room_list" ADD CONSTRAINT "class_room_list_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
