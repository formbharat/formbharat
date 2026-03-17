# FormBharat Setup Guide

Complete setup guide to get FormBharat running locally.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (we'll use Supabase)
- Git

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to be provisioned (2-3 minutes)
4. Go to Project Settings > API
5. Copy the following:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - anon/public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
6. Go to Project Settings > Database
7. Copy the connection string (DATABASE_URL)

## Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres
```

## Step 4: Set Up Database

Run Prisma migrations to create the database tables:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
form-bharat/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   └── forms/           # Form management endpoints
│   ├── auth/                # Auth pages (login/signup)
│   ├── builder/             # Form builder page
│   ├── dashboard/           # User dashboard
│   ├── f/[id]/              # Public form pages
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── form-builder/        # Form builder components
│   └── ui/                  # shadcn/ui components
├── lib/                     # Utilities
│   ├── prisma.ts            # Prisma client
│   ├── supabase.ts          # Supabase client
│   ├── types.ts             # TypeScript types
│   └── utils.ts             # Helper functions
├── prisma/
│   └── schema.prisma        # Database schema
└── public/                  # Static files
```

## Features Implemented

### ✅ MVP Features
- [x] Landing page with hero section
- [x] User authentication (signup/login)
- [x] Drag-and-drop form builder
- [x] 7 field types: text, email, phone, textarea, dropdown, radio, checkbox
- [x] Form publishing with unique URLs
- [x] Public form submission
- [x] Response collection and storage
- [x] Dashboard to manage forms
- [x] Response viewing page

### Field Types Available
1. **Text** - Single line text input
2. **Email** - Email validation
3. **Phone** - Phone number input
4. **Textarea** - Multi-line text
5. **Dropdown** - Select from options
6. **Radio** - Single choice from options
7. **Checkbox** - Multiple choices from options

## User Flow

### Creating a Form
1. Visit homepage → Click "Create Your First Form"
2. Use form builder to add/configure fields
3. Drag and drop to reorder fields
4. Set fields as required/optional
5. Click "Save Form" → Prompted to sign up/login
6. After authentication, form is saved
7. Redirected to dashboard

### Sharing a Form
1. Go to dashboard
2. Click "Copy Link" on any form
3. Share the link: `https://yourapp.com/f/[form-id]`
4. Users can fill and submit without authentication

### Viewing Responses
1. Dashboard → Click "View Responses" on a form
2. See all submissions with timestamps
3. Each response shows all field values

## Database Schema

### User Table
- id (UUID)
- email (unique)
- name
- createdAt
- updatedAt

### Form Table
- id (CUID)
- title
- description
- userId (FK to User)
- fields (JSON)
- published (boolean)
- createdAt
- updatedAt

### Response Table
- id (UUID)
- formId (FK to Form)
- data (JSON)
- createdAt

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login to account

### Forms
- `POST /api/forms` - Create new form
- `GET /api/forms` - Get all user forms
- `GET /api/forms/[id]` - Get single form
- `DELETE /api/forms/[id]` - Delete form

### Responses
- `POST /api/forms/[id]/responses` - Submit response
- `GET /api/forms/[id]/responses` - Get all responses

## Deployment

### Deploy to AWS Amplify

1. Push code to GitHub
2. Go to AWS Amplify Console
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
5. Add environment variables in Amplify
6. Deploy!

### Environment Variables for Production
Make sure to add these in Amplify:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check Supabase project is running
- Ensure IP is allowed in Supabase settings

### Authentication Not Working
- Verify Supabase URL and keys
- Check browser console for errors
- Clear localStorage and try again

### Build Errors
- Delete `.next` folder and node_modules
- Run `npm install` again
- Run `npx prisma generate`

## Next Steps / Future Features

### Week 2+ Features
- [ ] Razorpay payment integration
- [ ] Email notifications (Resend)
- [ ] CSV export for responses
- [ ] Form templates
- [ ] Form customization (themes/colors)
- [ ] Analytics dashboard
- [ ] Form sharing permissions
- [ ] Webhook integrations

## Tech Stack Summary

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Auth**: Supabase Auth
- **Drag & Drop**: dnd-kit
- **Icons**: Lucide React
- **Deployment**: AWS Amplify

## License

MIT - Open Source

## Support

For issues or questions, please open an issue on GitHub.
