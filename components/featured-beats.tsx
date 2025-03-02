import Link from "next/link"
import { BeatCard } from "@/components/beat-card"
import { Button } from "@/components/ui/button"
import clientPromise from "@/lib/mongodb"

async function getLatestBeats() {
  try {
    const client = await clientPromise
    const db = client.db("beatstore")
    const beats = await db.collection("beats")
      .find({ isDeleted: { $ne: 1 } })
      .sort({ createdAt: -1 })
      .limit(4)
      .toArray()

    return beats.map(beat => ({
      id: beat._id.toString(),
      title: beat.title,
      genre: beat.genre,
      bpm: beat.bpm,
      price: beat.pricing.basic,
      image: beat.image,
      audioUrl: beat.audioUrl,
    }))
  } catch (error) {
    console.error("Failed to fetch latest beats:", error)
    return []
  }
}

export default async function FeaturedBeats() {
  const latestBeats = await getLatestBeats()

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {latestBeats.map((beat) => (
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

