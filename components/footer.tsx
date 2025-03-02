import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800/50">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-heading tracking-tight">noiré</span>
            </Link>
            <p className="text-zinc-400 text-sm">
              Drake-inspired R&B beats for artists who want that authentic Toronto sound.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5 hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5 hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5 hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5 hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-heading mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/beats" className="text-zinc-400 hover:text-primary transition-colors">
                  Browse Beats
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-zinc-400 hover:text-primary transition-colors">
                  Sell Your Beats
                </Link>
              </li>
              <li>
                <Link href="/licensing" className="text-zinc-400 hover:text-primary transition-colors">
                  Licensing Info
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-heading mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-zinc-400 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-zinc-400 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-zinc-400 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-heading mb-4">Newsletter</h3>
            <p className="text-zinc-400 text-sm mb-4">Subscribe for exclusive beats and early access.</p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="bg-card border-zinc-800 focus:border-primary" />
              <Button className="rounded-none">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 mt-12 pt-6 text-center text-zinc-400 text-sm">
          <p>© {new Date().getFullYear()} noiré. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

