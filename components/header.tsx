"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ShoppingCart, User, Menu, Upload, LogIn } from "lucide-react"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-black border-zinc-800">
            <div className="flex flex-col gap-6 py-6">
              <Link href="/" className="flex items-center gap-2 text-lg font-heading">
                <span>noiré</span>
              </Link>
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/beats" className="text-zinc-400 hover:text-white transition-colors">
                  Beats
                </Link>
                <Link href="/upload" className="text-zinc-400 hover:text-white transition-colors">
                  Upload
                </Link>
                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2 mr-6">
          <span className="text-lg font-heading tracking-tight">noiré</span>
        </Link>

        <nav className="hidden md:flex gap-6 mr-6">
          <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/beats" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Beats
          </Link>
          <Link href="/upload" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Upload
          </Link>
          <Link href="/about" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          {isSearchOpen ? (
            <div className="relative w-full max-w-sm">
              <Input
                placeholder="Search beats..."
                className="bg-card pr-8 border-zinc-800 focus:border-primary"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black border-zinc-800">
              <DropdownMenuItem asChild>
                <Link href="/login" className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/upload" className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  <span>Upload Beat</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

