-- CreateTable
CREATE TABLE "Beer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "alcohol" DOUBLE PRECISION NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "Beer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Beer_imageId_key" ON "Beer"("imageId");

-- AddForeignKey
ALTER TABLE "Beer" ADD CONSTRAINT "Beer_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
