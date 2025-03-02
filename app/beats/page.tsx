import { BeatCard } from "@/components/beat-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for beats
const beats = [
  {
    id: "1",
    title: "Midnight Dreams",
    genre: "Trap",
    bpm: 140,
    price: 49.99,
    image: "/placeholder.svg?height=400&width=400",
    audioUrl: "#",
  },
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
  {
    id: "5",
    title: "Dark Matter",
    genre: "Drill",
    bpm: 145,
    price: 49.99,
    image: "/placeholder.svg?height=400&width=400",
    audioUrl: "#",
  },
  {
    id: "6",
    title: "Chill Wave",
    genre: "Lo-Fi",
    bpm: 85,
    price: 34.99,
    image: "/placeholder.svg?height=400&width=400",
    audioUrl: "#",
  },
]

export default function BeatsPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Beat Catalog</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Input placeholder="Search beats..." className="bg-zinc-900" />

        <Select>
          <SelectTrigger className="bg-zinc-900">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            <SelectItem value="trap">Trap</SelectItem>
            <SelectItem value="hiphop">Hip Hop</SelectItem>
            <SelectItem value="rnb">R&B</SelectItem>
            <SelectItem value="pop">Pop</SelectItem>
            <SelectItem value="drill">Drill</SelectItem>
            <SelectItem value="lofi">Lo-Fi</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="bg-zinc-900">
            <SelectValue placeholder="BPM Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All BPM</SelectItem>
            <SelectItem value="70-90">70-90</SelectItem>
            <SelectItem value="90-110">90-110</SelectItem>
            <SelectItem value="110-130">110-130</SelectItem>
            <SelectItem value="130-150">130-150</SelectItem>
            <SelectItem value="150+">150+</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="bg-zinc-900">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Beat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {beats.map((beat) => (
          <BeatCard key={beat.id} beat={beat} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" disabled>
            &lt;
          </Button>
          <Button variant="outline" size="icon" className="bg-primary">
            1
          </Button>
          <Button variant="outline" size="icon">
            2
          </Button>
          <Button variant="outline" size="icon">
            3
          </Button>
          <Button variant="outline" size="icon">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}

