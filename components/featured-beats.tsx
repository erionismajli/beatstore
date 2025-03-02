import Link from "next/link"
import { BeatCard } from "@/components/beat-card"
import { Button } from "@/components/ui/button"

// Mock data for featured beats with Drake-inspired R&B vibe
const featuredBeats = [
  {
    id: "1",
    title: "Midnight Feelings",
    genre: "R&B",
    bpm: 68,
    price: 49.99,
    image: "/placeholder.svg?height=400&width=400",
    audioUrl: "#",
  },
  {
    id: "2",
    title: "6 Side",
    genre: "R&B/Trap",
    bpm: 72,
    price: 59.99,
    image: "/placeholder.svg?height=400&width=400",
    audioUrl: "#",
  },
  {
    id: "3",
    title: "Late Night Text",
    genre: "R&B",
    bpm: 65,
    price: 49.99,
    image: "/placeholder.svg?height=400&width=400",
    audioUrl: "#",
  },
  {
    id: "4",
    title: "Marvin's Room Type",
    genre: "R&B",
    bpm: 70,
    price: 54.99,
    image: "/placeholder.svg?height=400&width=400",
    audioUrl: "#",
  },
]

export default function FeaturedBeats() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featuredBeats.map((beat) => (
          <BeatCard key={beat.id} beat={beat} />
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <Link href="/beats">
          <Button variant="outline" className="rounded-none border-zinc-800 hover:bg-white/5 hover:border-primary px-8">
            View All Beats
          </Button>
        </Link>
      </div>
    </div>
  )
}

