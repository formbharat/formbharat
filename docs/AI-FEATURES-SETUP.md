# AI Features Setup Guide - AWS Bedrock

**Last Updated:** April 21, 2026  
**Status:** AI Form Generator - IMPLEMENTED ✅

---

## Overview

FormBharat now uses **AWS Bedrock** for AI features, giving you access to multiple LLMs (Claude, Llama, Mistral) with:
- ✅ Better pricing than OpenAI direct
- ✅ Data stays in AWS (same infrastructure as your app)
- ✅ No separate API keys needed (uses IAM role)
- ✅ Choice of models based on use case

---

## Prerequisites

1. AWS Account (same one used for Amplify)
2. AWS Bedrock access enabled in `ap-south-1` region
3. IAM permissions configured

---

## Step 1: Enable AWS Bedrock Access

### 1.1 Request Model Access

1. Go to AWS Console → **Bedrock** → **Model access**
2. Click **"Manage model access"**
3. Enable these models:
   - ✅ **Meta Llama 3 70B** (default - no use case needed, instant approval)
   - 📝 **Anthropic Claude 3 Haiku** (requires use case - see end of doc)
   - 📝 **Anthropic Claude 3.5 Sonnet** (requires use case - best quality)
   - ✅ **Mistral Large** (optional - European, instant approval)

4. Click **"Request model access"**
5. Wait 2-5 minutes for approval (Llama 3 & Mistral are instant)

### 1.2 Verify Access

```bash
aws bedrock list-foundation-models --region ap-south-1
```

You should see the models you requested.

---

## Step 2: Configure IAM Permissions

### 2.1 Find Your Amplify Execution Role

1. AWS Console → **IAM** → **Roles**
2. Search for your app name (e.g., `AmplifySSRLoggingRole-formbharat`)
3. Click the role

### 2.2 Add Bedrock Permissions

Click **"Add permissions"** → **"Create inline policy"**

**Policy JSON:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel"
      ],
      "Resource": [
        "arn:aws:bedrock:ap-south-1::foundation-model/meta.llama3-70b-instruct-v1:0",
        "arn:aws:bedrock:ap-south-1::foundation-model/mistral.mistral-large-2402-v1:0",
        "arn:aws:bedrock:ap-south-1::foundation-model/anthropic.claude-3-haiku-20240307-v1:0",
        "arn:aws:bedrock:ap-south-1::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0"
      ]
    }
  ]
}
```

**Note:** Llama 3 and Mistral work immediately. Add Claude models after use case approval.

**Policy Name:** `BedrockInvokeModelPolicy`

Click **"Create policy"**

---

## Step 3: Environment Variables

### Production (Amplify)

Add these in **Amplify Console → Environment variables**:

```bash
REGION_AWS=ap-south-1
```

That's it! Credentials come from the IAM role automatically.

### Local Development

Add to `.env.local`:

```bash
REGION_AWS=ap-south-1
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
```

---

## Step 4: Database Migration

Already done! The `AIUsage` table tracks:
- User ID
- Feature used (generate-form, translate, etc.)
- Tokens consumed
- Cost in USD
- Metadata (description, language, etc.)

---

## Step 5: Test the AI Form Generator

### 5.1 Local Testing

1. Start dev server: `npm run dev`
2. Go to Dashboard
3. Click **"AI Generate"** button (purple gradient)
4. Enter: "Customer feedback form for my restaurant"
5. Click **"Generate Form"**
6. Wait 5-10 seconds
7. Review generated form
8. Click **"Use This Form"**

### 5.2 Verify in Database

```sql
SELECT * FROM "AIUsage" ORDER BY "createdAt" DESC LIMIT 10;
```

You should see:
- `feature`: "generate-form"
- `tokensUsed`: ~500-1000
- `cost`: ~$0.001-0.002

---

## Cost Estimation

### Meta Llama 3 70B (Current Default)

| Usage | Input Tokens | Output Tokens | Cost per Generation |
|-------|--------------|---------------|---------------------|
| Simple form (5 fields) | 300 | 400 | $0.0007 |
| Complex form (10 fields) | 500 | 800 | $0.0013 |

**Monthly cost at 1000 users:**
- 5 generations per user = 5,000 total
- Average cost: $0.001 per generation
- **Total: ~$5/month** 🎉

### Claude 3 Haiku (After Use Case Approval)

| Usage | Cost per Generation |
|-------|---------------------|
| Simple form | $0.0006 |
| Complex form | $0.0011 |

**Monthly cost at 1000 users:** ~$4/month (20% cheaper than Llama)

### Claude 3.5 Sonnet (Premium)

| Usage | Cost per Generation |
|-------|---------------------|
| Simple form | $0.007 |
| Complex form | $0.014 |

**Monthly cost at 1000 users:** ~$50/month

---

## Rate Limiting

**Current limits (per user):**
- 5 form generations per day
- Resets every 24 hours
- Tracked in `AIUsage` table

**To change limits:**
Edit `app/api/ai/generate-form/route.ts`:
```typescript
const RATE_LIMIT = 10 // Change from 5 to 10
```

---

## Monitoring & Analytics

### Track AI Usage

```sql
-- Total AI usage by feature
SELECT 
  feature,
  COUNT(*) as usage_count,
  SUM("tokensUsed") as total_tokens,
  SUM(cost) as total_cost
FROM "AIUsage"
GROUP BY feature
ORDER BY total_cost DESC;

-- Top AI users
SELECT 
  u.email,
  COUNT(*) as generations,
  SUM(a.cost) as total_spent
FROM "AIUsage" a
JOIN "User" u ON a."userId" = u.id
WHERE a.feature = 'generate-form'
GROUP BY u.email
ORDER BY total_spent DESC
LIMIT 10;

-- Daily AI costs
SELECT 
  DATE("createdAt") as date,
  COUNT(*) as generations,
  SUM(cost) as daily_cost
FROM "AIUsage"
WHERE feature = 'generate-form'
GROUP BY DATE("createdAt")
ORDER BY date DESC
LIMIT 30;
```

---

## Switching Models

### Use Case Guide

| Model | Best For | Speed | Cost | Quality | Approval |
|-------|----------|-------|------|---------|----------|
| **Llama 3 70B** ⭐ | Current default, open source | ⚡⚡ | 💰💰 | ⭐⭐⭐⭐ | ✅ Instant |
| **Claude 3 Haiku** | Best cost/quality ratio | ⚡⚡⚡ | 💰 | ⭐⭐⭐⭐ | 📝 Use case |
| **Claude 3.5 Sonnet** | Complex forms, multilingual | ⚡⚡ | 💰💰💰 | ⭐⭐⭐⭐⭐ | 📝 Use case |
| **Mistral Large** | GDPR compliance, European | ⚡⚡ | 💰💰💰 | ⭐⭐⭐⭐ | ✅ Instant |

### Change Default Model

Edit `app/api/ai/generate-form/route.ts`:

```typescript
const { text, usage } = await invokeBedrock({
  model: 'anthropic.claude-3-5-sonnet-20240620-v1:0', // Change this
  systemPrompt,
  prompt: userPrompt,
  maxTokens: 2000,
  temperature: 0.7,
})
```

---

## Troubleshooting

### Error: "Model not found"

**Cause:** Model access not enabled in Bedrock

**Fix:**
1. Go to Bedrock → Model access
2. Enable the model
3. Wait 2-5 minutes

### Error: "Access Denied"

**Cause:** IAM role missing Bedrock permissions

**Fix:**
1. Check IAM role has `bedrock:InvokeModel` permission
2. Verify resource ARN matches your region

### Error: "Rate limit exceeded"

**Cause:** User hit daily limit (5 generations)

**Fix:**
- Wait 24 hours OR
- Increase `RATE_LIMIT` in API route OR
- Implement paid tier with higher limits

### Slow Response (>15 seconds)

**Cause:** Using Claude 3.5 Sonnet or complex prompts

**Fix:**
- Switch to Claude 3 Haiku (faster)
- Reduce `maxTokens` to 1500
- Simplify system prompt

---

## Next AI Features

**Priority order:**

1. ✅ **AI Form Generator** (DONE)
2. 🔄 **Multilingual Translation** (Next)
3. 🔄 **Response Summarizer**
4. 🔄 **AI Help Chatbot**
5. 🔄 **Smart Field Suggestions**

See `PRD-FORMBHARAT.md` for full specs.

---

## Security Best Practices

✅ **Implemented:**
- Rate limiting (5/day per user)
- Input sanitization (prevent prompt injection)
- No PII sent to Bedrock
- IAM role-based auth (no hardcoded keys)
- Usage tracking for billing

⚠️ **TODO:**
- Add content filtering (block harmful outputs)
- Implement user-provided API keys (bring your own Bedrock)
- Add cost alerts (email when monthly cost > $100)

---

## Support

**Issues?** Open a GitHub issue or email: shivam@formbharat.com

**Costs too high?** Consider:
1. Switching to Claude 3 Haiku
2. Reducing rate limits
3. Caching common form types
4. Implementing paid tiers

---

---

## Appendix: Claude Model Use Case Template

When you're ready to switch to Claude models (20% cheaper, faster), submit this use case in AWS Bedrock:

### Use Case Submission

**Go to:** AWS Console → Bedrock → Model access → Anthropic Claude 3 Haiku → "Request access"

**Company/Organization Name:**
```
FormBharat (or your company name)
```

**Use Case Description:**
```
We are building FormBharat, an open-source form builder platform designed for Indian SMBs. 
We need Claude models for the following AI features:

1. AI Form Generator: Convert natural language descriptions into structured forms
   - Input: "Customer feedback form for restaurant" 
   - Output: Complete form with 5-10 relevant fields (name, email, ratings, feedback)
   - Volume: ~5,000 requests/month
   - Languages: English and Hindi

2. Multilingual Translation (planned): Translate forms into 6 Indian languages
   - Input: Form fields in English
   - Output: Translated fields in Hindi, Tamil, Telugu, Marathi, Gujarati, Bengali
   - Volume: ~2,000 requests/month

3. Response Analysis (planned): Summarize text responses and extract insights
   - Input: 50-100 customer feedback responses
   - Output: Key themes, sentiment analysis, actionable insights
   - Volume: ~1,000 requests/month

We chose Claude for:
- Superior multilingual support (critical for Indian languages)
- Better JSON output formatting
- Lower cost compared to GPT-4
- Data stays in AWS (same infrastructure as our app)

Current setup: Using Llama 3 70B temporarily while awaiting Claude approval.
Target model: Claude 3 Haiku for production (cost-effective)
```

**Industry:**
```
Technology - SaaS/Software
```

**Expected Monthly Volume:**
```
10,000 - 50,000 requests/month
```

**Data Sensitivity:**
```
Low - No PII or sensitive data sent to models. 
All user data is anonymized before processing.
```

**Compliance Requirements:**
```
DPDPA (India's data protection law) - data residency in ap-south-1 region
```

### Expected Timeline

- **Submission:** 5 minutes
- **AWS Review:** 1-3 business days
- **Approval:** Usually granted within 24-48 hours
- **Switch to Claude:** Update 1 line of code

### After Approval

1. Update `app/api/ai/generate-form/route.ts`:
```typescript
model: 'anthropic.claude-3-haiku-20240307-v1:0', // Change from Llama
```

2. Update cost calculation:
```typescript
const cost = calculateCost(
  'anthropic.claude-3-haiku-20240307-v1:0',
  usage.inputTokens,
  usage.outputTokens
)
```

3. Deploy and enjoy 20% cost savings! 🎉

---

**Last updated:** April 21, 2026  
**Next review:** After Claude approval and multilingual translation implementation
