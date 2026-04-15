<div align="center">

# 📝 FormBharat

### Open Source Form Builder for Indian Businesses

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Made in India](https://img.shields.io/badge/Made%20in-India%20🇮🇳-orange)](https://formbharat.com)

**[Website](https://formbharat.com)** • **[Documentation](https://formbharat.com/open-source)** • **[Contributing](CONTRIBUTING.md)** • **[License](LICENSE)**

Create beautiful forms, collect responses, and manage your data — all for free, forever.

---

</div>

## ✨ Features

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

## 🤝 Contributing

We love contributions! FormBharat is made better by amazing people like you.

### Ways to Contribute

- 🐛 **Report Bugs**: Found a bug? [Open an issue](https://github.com/formbharat/formbharat/issues)
- 💡 **Suggest Features**: Have ideas? We'd love to hear them!
- 📝 **Improve Documentation**: Help others understand the project better
- 🌐 **Translate**: Make FormBharat accessible in regional languages
- 💻 **Code**: Pick an issue and submit a PR

Read our [Contributing Guide](CONTRIBUTING.md) to get started.

### Good First Issues

Looking for a place to start? Check out issues labeled [`good first issue`](https://github.com/formbharat/formbharat/labels/good%20first%20issue).

## 📄 License

FormBharat is [MIT licensed](LICENSE). You can use it for personal or commercial projects, modify it, and distribute it freely.

## 🙏 Acknowledgments

Built with ❤️ by the FormBharat community and powered by:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Prisma](https://www.prisma.io/)
- [shadcn/ui](https://ui.shadcn.com/)

## 💬 Community & Support

- 🐦 Twitter: [@formbharat](https://twitter.com/formbharat)
- 💼 LinkedIn: [FormBharat](https://linkedin.com/company/formbharat)
- 📧 Email: [hello@formbharat.com](mailto:hello@formbharat.com)
- 🌐 Website: [formbharat.com](https://formbharat.com)

---

<div align="center">

**[⭐ Star us on GitHub](https://github.com/formbharat/formbharat)** — it motivates us to keep improving!

Made with ❤️ in India 🇮🇳

</div>
