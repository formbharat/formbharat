# FormBharat

Open source form builder for Indian businesses. Create beautiful forms, collect responses, and manage your data.

## Features

- 🎨 Drag-and-drop form builder
- 📱 Mobile-responsive forms
- 📊 Response collection and management
- 🔐 Supabase authentication
- 🎯 Built for Indian businesses
- ⚡ Built with Next.js 15, TypeScript, and TailwindCSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL (via Supabase)

### Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd form-bharat
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Add your Supabase credentials to `.env`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_postgres_connection_string
```

5. Run database migrations
```bash
npx prisma migrate dev
npx prisma generate
```

6. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **Drag & Drop**: dnd-kit

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
