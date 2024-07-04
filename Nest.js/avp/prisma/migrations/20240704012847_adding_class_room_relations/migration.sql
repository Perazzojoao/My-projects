-- CreateEnum
CREATE TYPE "Shift" AS ENUM ('Manha', 'Tarde', 'Noite');

-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('SEVEN', 'EIGHT');

-- CreateTable
CREATE TABLE "class_rooms" (
    "id" SERIAL NOT NULL,
    "shift" "Shift" NOT NULL,
    "grade" "Grade" NOT NULL,
    "coordId" INTEGER NOT NULL,

    CONSTRAINT "class_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_room_list" (
    "classRoomId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "class_room_list_pkey" PRIMARY KEY ("classRoomId","studentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "class_rooms_coordId_key" ON "class_rooms"("coordId");

-- AddForeignKey
ALTER TABLE "class_rooms" ADD CONSTRAINT "class_rooms_coordId_fkey" FOREIGN KEY ("coordId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_room_list" ADD CONSTRAINT "class_room_list_classRoomId_fkey" FOREIGN KEY ("classRoomId") REFERENCES "class_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_room_list" ADD CONSTRAINT "class_room_list_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
