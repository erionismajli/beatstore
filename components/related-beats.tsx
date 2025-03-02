import { BeatCard } from "@/components/beat-card"

// Mock data for related beats
const relatedBeats = [
  {
    id: "2",
    title: "Summer Vibes",
    genre: "R&B",
    bpm: 95,
    price: 39.99,
    image: "/placeholder.svg?height=400&width=400",
    audioUrl: "#",
  },
  {
    id: "3",
    title: "Urban Flow",
    genre: "Hip Hop",
    bpm: 90,
    price: 59.99,
    image: "/placeholder.svg?height=400&width=400",
    audioUrl: "#",
  },
  {
    id: "4",
    title: "Electric Soul",
    genre: "Pop",
    bpm: 120,
    price: 44.99,
    image: "/placeholder.svg?height=400&width=400",
    audioUrl: "#",
  },
]

export default function RelatedBeats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {relatedBeats.map((beat) => (
        <BeatCard key={beat.id} beat={beat} />
      ))}
    </div>
  )
}

