import { BeatCard } from "@/components/beat-card"
import clientPromise from "@/lib/mongodb"

async function getRelatedBeats(currentBeatId: string, genre: string) {
  try {
    const client = await clientPromise
    const db = client.db("beatstore")
    const beats = await db.collection("beats")
      .find({
        _id: { $ne: currentBeatId },
        genre: genre,
        isDeleted: { $ne: 1 }
      })
      .limit(3)
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
    console.error("Failed to fetch related beats:", error)
    return []
  }
}

export default async function RelatedBeats({ currentBeatId, genre }: { currentBeatId: string, genre: string }) {
  const relatedBeats = await getRelatedBeats(currentBeatId, genre)

  if (relatedBeats.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {relatedBeats.map((beat) => (
        <BeatCard key={beat.id} beat={beat} />
      ))}
    </div>
  )
}

