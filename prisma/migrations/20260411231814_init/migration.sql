-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "fields" JSONB NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "multiStepEnabled" BOOLEAN NOT NULL DEFAULT false,
    "steps" JSONB,
    "webhookUrl" TEXT,
    "webhookEnabled" BOOLEAN NOT NULL DEFAULT false,
    "webhookSecret" TEXT,
    "emailNotificationsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "emailRecipients" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "emailTemplate" TEXT,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completionTime" INTEGER,
    "abandoned" BOOLEAN NOT NULL DEFAULT false,
    "currentPage" INTEGER,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookLog" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "response" JSONB,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebhookLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Form_userId_idx" ON "Form"("userId");

-- CreateIndex
CREATE INDEX "Response_formId_idx" ON "Response"("formId");

-- CreateIndex
CREATE INDEX "WebhookLog_formId_idx" ON "WebhookLog"("formId");

-- CreateIndex
CREATE INDEX "WebhookLog_status_idx" ON "WebhookLog"("status");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebhookLog" ADD CONSTRAINT "WebhookLog_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
