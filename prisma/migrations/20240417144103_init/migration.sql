-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "shipping_address" TEXT,
    "billing_address" TEXT,
    "gst_no" TEXT,
    "password" TEXT NOT NULL,
    "session_timeout" TIMESTAMP(3),
    "session_token" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
