import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BeatPlayer } from "@/components/beat-player"
import RelatedBeats from "@/components/related-beats"
import { Download, ShoppingCart } from "lucide-react"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { notFound } from "next/navigation"

async function getBeat(id: string) {
  try {
    const client = await clientPromise
    const db = client.db("beatstore")
    const beat = await db.collection("beats").findOne({ _id: new ObjectId(id) })
    return beat
  } catch (error) {
    console.error("Failed to fetch beat:", error)
    return null
  }
}

export default async function BeatPage({ params }: { params: { id: string } }) {
  const beat = await getBeat(params.id)

  if (!beat) {
    notFound()
  }

  return (
    <div className="container px-4 md:px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Beat Image */}
        <div className="lg:col-span-1">
          <div className="rounded-lg overflow-hidden bg-card aspect-square grain-image">
            <img src={beat.image || "/placeholder.svg"} alt={beat.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right Column - Beat Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-heading mb-2">{beat.title}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {beat.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-black border border-zinc-800 text-zinc-300 px-3 py-1 rounded-none text-xs uppercase tracking-wider"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card p-4 border border-zinc-800">
              <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Genre</p>
              <p className="font-medium">{beat.genre}</p>
            </div>
            <div className="bg-card p-4 border border-zinc-800">
              <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">BPM</p>
              <p className="font-medium">{beat.bpm}</p>
            </div>
            <div className="bg-card p-4 border border-zinc-800">
              <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Key</p>
              <p className="font-medium">{beat.key}</p>
            </div>
            <div className="bg-card p-4 border border-zinc-800">
              <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Date</p>
              <p className="font-medium">{new Date(beat.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <BeatPlayer audioUrl={beat.audioUrl} />

          <div className="mt-10">
            <h2 className="text-xl font-heading mb-4">Select License</h2>
            <Select defaultValue="premium">
              <SelectTrigger className="bg-card mb-6 border-zinc-800 rounded-none">
                <SelectValue placeholder="Choose a license" />
              </SelectTrigger>
              <SelectContent className="bg-black border-zinc-800">
                <SelectItem value="basic">Basic License - ${beat.pricing.basic}</SelectItem>
                <SelectItem value="premium">Premium License - ${beat.pricing.premium}</SelectItem>
                <SelectItem value="exclusive">Exclusive License - ${beat.pricing.exclusive}</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 rounded-none">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-none border-zinc-800 hover:bg-white/5 hover:border-primary"
              >
                <Download className="mr-2 h-4 w-4" /> Download Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3 bg-black border border-zinc-800 rounded-none p-0 h-auto">
            <TabsTrigger value="description" className="rounded-none py-3 data-[state=active]:bg-card">
              Description
            </TabsTrigger>
            <TabsTrigger value="license" className="rounded-none py-3 data-[state=active]:bg-card">
              License Details
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-none py-3 data-[state=active]:bg-card">
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-6 bg-card border border-zinc-800 mt-0">
            <p>{beat.description}</p>
          </TabsContent>
          <TabsContent value="license" className="p-6 bg-card border border-zinc-800 mt-0">
            <h3 className="font-heading mb-4">Premium License Includes:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span> MP3 and WAV files
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span> Commercial use up to 10,000 streams
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span> Use in one music video
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span> Credit must be given (Prod. by noiré)
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span> Non-exclusive rights
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="p-6 bg-card border border-zinc-800 mt-0">
            <p>No reviews yet. Be the first to review this beat!</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Beats */}
      <div className="mt-20">
        <h2 className="text-2xl md:text-3xl font-heading mb-8">Similar Vibes</h2>
        <RelatedBeats />
      </div>
    </div>
  )
}

