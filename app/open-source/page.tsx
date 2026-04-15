import Link from 'next/link'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Github, Star, GitFork, Code2, Users, Heart, BookOpen, MessageSquare, Zap, Shield, Globe } from 'lucide-react'

export const metadata = {
  title: 'Open Source - FormBharat',
  description: 'FormBharat is open source and free forever. Join our community, contribute, and help build the best form builder for Indian businesses.',
}

export default function OpenSourcePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                FormBharat
              </span>
            </Link>
            <Link href="/">
              <Button variant="ghost">← Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-orange-200 mb-6">
            <Code2 className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">100% Open Source</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Built in the Open,
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Free Forever
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            FormBharat is completely open source. Transparent, community-driven, and built for Indian businesses by developers who care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/formbharat/formbharat" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </a>
            <Link href="#contribute">
              <Button size="lg" variant="outline">
                Start Contributing
              </Button>
            </Link>
          </div>

          {/* GitHub Stats */}
          <div className="flex flex-wrap gap-6 justify-center mt-12 text-sm">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold">Star on GitHub</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border">
              <GitFork className="h-4 w-4 text-gray-600" />
              <span className="font-semibold">Fork & Contribute</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="font-semibold">MIT Licensed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Open Source Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why We're Open Source
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  You can inspect every line of code. No hidden tracking, no surprises. What you see is what you get.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Community-Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Built by the community, for the community. Your feedback shapes the product roadmap.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Open collaboration leads to faster innovation and better features for everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Modern Tech Stack
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Built with the latest technologies for performance, scalability, and developer experience
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Next.js 14', desc: 'React Framework' },
              { name: 'TypeScript', desc: 'Type Safety' },
              { name: 'Tailwind CSS', desc: 'Styling' },
              { name: 'Prisma', desc: 'Database ORM' },
              { name: 'Supabase', desc: 'Auth & Storage' },
              { name: 'PostgreSQL', desc: 'Database' },
              { name: 'shadcn/ui', desc: 'UI Components' },
              { name: 'Vercel', desc: 'Deployment' },
            ].map((tech) => (
              <div key={tech.name} className="bg-white p-4 rounded-xl border text-center">
                <div className="font-semibold text-gray-900">{tech.name}</div>
                <div className="text-sm text-gray-500 mt-1">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Contribute Section */}
      <section id="contribute" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Start Contributing Today
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Whether you're a developer, designer, or just passionate about forms, there's a place for you!
          </p>

          <div className="space-y-6 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-orange-600">1</span>
                  </div>
                  <div>
                    <CardTitle>Fork the Repository</CardTitle>
                    <CardDescription className="mt-2">
                      Head over to our GitHub repository and fork it to your account
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-orange-600">2</span>
                  </div>
                  <div>
                    <CardTitle>Pick an Issue</CardTitle>
                    <CardDescription className="mt-2">
                      Browse open issues labeled "good first issue" or "help wanted"
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-orange-600">3</span>
                  </div>
                  <div>
                    <CardTitle>Make Your Changes</CardTitle>
                    <CardDescription className="mt-2">
                      Create a new branch, make your changes, and write tests
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-orange-600">4</span>
                  </div>
                  <div>
                    <CardTitle>Submit a Pull Request</CardTitle>
                    <CardDescription className="mt-2">
                      Push your changes and open a PR with a clear description
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-8 rounded-2xl border border-orange-100">
            <h3 className="text-xl font-bold mb-4">Ways to Contribute</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Code2 className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <div className="font-semibold">Code</div>
                  <div className="text-sm text-gray-600">Fix bugs, add features, improve performance</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <div className="font-semibold">Documentation</div>
                  <div className="text-sm text-gray-600">Write guides, tutorials, API docs</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <div className="font-semibold">Support</div>
                  <div className="text-sm text-gray-600">Help users in GitHub discussions</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <div className="font-semibold">Translation</div>
                  <div className="text-sm text-gray-600">Translate to regional languages</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* License Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            MIT Licensed
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            FormBharat is released under the MIT License. This means you can use it for personal or commercial projects, modify it, and distribute it freely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/formbharat/formbharat/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                View License
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline">
                Commercial Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the FormBharat Community
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Be part of building the best form builder for Indian businesses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/formbharat/formbharat" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                <Github className="mr-2 h-5 w-5" />
                Star on GitHub
              </Button>
            </a>
            <Link href="/builder">
              <Button size="lg" variant="outline">
                Try FormBharat Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
