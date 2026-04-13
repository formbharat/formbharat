#!/usr/bin/env node

/**
 * Setup environment variables for AWS Amplify deployment
 * This script reads environment variables and writes them to .env.production
 */

const fs = require('fs');
const path = require('path');

const envVars = [
  'DATABASE_URL',
  'DIRECT_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'RESEND_API_KEY',
];

const envContent = envVars
  .map(varName => {
    const value = process.env[varName];
    if (value) {
      return `${varName}="${value}"`;
    } else {
      console.warn(`⚠️  Warning: ${varName} is not set`);
      return null;
    }
  })
  .filter(Boolean)
  .join('\n');

const envFilePath = path.join(process.cwd(), '.env.production');

fs.writeFileSync(envFilePath, envContent + '\n');

console.log('✅ Environment variables written to .env.production');
console.log(`📝 Variables set: ${envVars.filter(v => process.env[v]).length}/${envVars.length}`);
