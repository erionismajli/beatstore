import { BeatCard } from "@/components/beat-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import clientPromise from "@/lib/mongodb"

async function getBeats() {
  try {
    const client = await clientPromise
    const db = client.db("beatstore")
    const beats = await db.collection("beats").find({}).toArray()
    return beats
  } catch (error) {
    console.error("Failed to fetch beats:", error)
    return []
  }
}

export default async function BeatsPage() {
  const beats = await getBeats()

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
          <BeatCard 
            key={beat._id.toString()} 
            beat={{
              id: beat._id.toString(),
              title: beat.title,
              genre: beat.genre,
              bpm: beat.bpm,
              price: beat.pricing.basic,
              image: beat.image,
              audioUrl: beat.audioUrl,
            }} 
          />
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

