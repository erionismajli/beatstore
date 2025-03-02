import Link from "next/link"
import { Play } from "lucide-react"
import FeaturedBeats from "@/components/featured-beats"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 grain-image">
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-90"
            style={{
              backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-heading tracking-tighter">noiré</h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-[800px] font-light">
            Premium R&B beats with that Drake-inspired vibe you've been searching for
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-none px-8">
              <Play className="mr-2 h-4 w-4" /> Listen Now
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-none border-white/20 hover:bg-white/5">
              <Link href="/beats">Browse Catalog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Beats Section */}
      <section className="py-20 bg-zinc-950">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-heading tracking-tighter mb-12">Latest Vibes</h2>
          <FeaturedBeats />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-black">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-heading tracking-tighter mb-12 text-center">License Your Sound</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 border border-zinc-800 group hover:border-primary transition-all duration-300">
              <h3 className="text-xl font-heading mb-2">Basic License</h3>
              <p className="text-3xl font-heading mb-6">$29.99</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span> MP3 File
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span> Non-commercial use
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span> 1,000 streams
                </li>
              </ul>
              <Button className="w-full rounded-none bg-black hover:bg-primary border border-zinc-800 group-hover:border-primary">
                Select
              </Button>
            </div>
            <div className="bg-card p-8 border border-primary relative">
              <div className="absolute top-0 right-0 bg-primary text-black text-xs font-medium py-1 px-3 uppercase tracking-wider">
                Popular
              </div>
              <h3 className="text-xl font-heading mb-2">Premium License</h3>
              <p className="text-3xl font-heading mb-6">$79.99</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span> WAV + MP3 Files
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span> Commercial use
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span> 10,000 streams
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span> Trackout stems
                </li>
              </ul>
              <Button className="w-full rounded-none">Select</Button>
            </div>
            <div className="bg-card p-8 border border-zinc-800 group hover:border-primary transition-all duration-300">
              <h3 className="text-xl font-heading mb-2">Exclusive License</h3>
              <p className="text-3xl font-heading mb-6">$299.99</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span> All file formats
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span> Full ownership
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span> Unlimited use
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span> Beat removed from store
                </li>
              </ul>
              <Button className="w-full rounded-none bg-black hover:bg-primary border border-zinc-800 group-hover:border-primary">
                Select
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-zinc-950">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-heading tracking-tighter mb-12 text-center">Artist Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 border border-zinc-800">
              <p className="italic mb-6 text-zinc-300">
                "These beats got me in my feelings. noiré really captures that Drake vibe I've been looking for in my
                tracks."
              </p>
              <p className="font-heading">- Marcus J.</p>
            </div>
            <div className="bg-card p-8 border border-zinc-800">
              <p className="italic mb-6 text-zinc-300">
                "The quality is unmatched. That R&B sound with the perfect amount of melancholy. My fans can't get
                enough."
              </p>
              <p className="font-heading">- Aliyah K.</p>
            </div>
            <div className="bg-card p-8 border border-zinc-800">
              <p className="italic mb-6 text-zinc-300">
                "noiré understands the vibe. These beats helped me create my most successful EP to date. Worth every
                penny."
              </p>
              <p className="font-heading">- James T.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

