-- FormBharat Database Setup
-- Run this in your Supabase SQL Editor

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Form table  
CREATE TABLE IF NOT EXISTS "Form" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,
    fields JSONB NOT NULL DEFAULT '[]'::jsonb,
    published BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create Response table
CREATE TABLE IF NOT EXISTS "Response" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "formId" TEXT NOT NULL,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Response_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "Form_userId_idx" ON "Form"("userId");
CREATE INDEX IF NOT EXISTS "Response_formId_idx" ON "Response"("formId");
CREATE INDEX IF NOT EXISTS "Response_createdAt_idx" ON "Response"("createdAt");
CREATE INDEX IF NOT EXISTS "Form_createdAt_idx" ON "Form"("createdAt");

-- Grant permissions (adjust as needed)
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Form" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Response" ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated access
CREATE POLICY "Users can view own profile" ON "User"
    FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update own profile" ON "User"
    FOR UPDATE USING (auth.uid()::text = id);

CREATE POLICY "Users can view own forms" ON "Form"
    FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can create own forms" ON "Form"
    FOR INSERT WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update own forms" ON "Form"
    FOR UPDATE USING (auth.uid()::text = "userId");

CREATE POLICY "Users can delete own forms" ON "Form"
    FOR DELETE USING (auth.uid()::text = "userId");

-- Anyone can submit responses to published forms
CREATE POLICY "Anyone can submit responses" ON "Response"
    FOR INSERT WITH CHECK (true);

-- Users can view responses to their own forms
CREATE POLICY "Users can view responses to own forms" ON "Response"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "Form" 
            WHERE "Form".id = "Response"."formId" 
            AND "Form"."userId" = auth.uid()::text
        )
    );
