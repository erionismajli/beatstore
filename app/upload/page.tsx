"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Upload, Music } from "lucide-react"

export default function UploadPage() {
  const [bpm, setBpm] = useState<number[]>([120])

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload New Beat</h1>

        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <div className="border-2 border-dashed border-zinc-700 rounded-lg p-10 text-center">
            <Music className="h-12 w-12 mx-auto mb-4 text-zinc-500" />
            <h3 className="text-lg font-medium mb-2">Drag and drop your beat file</h3>
            <p className="text-zinc-400 mb-4">MP3, WAV, or FLAC. Max 50MB.</p>
            <Button>
              <Upload className="mr-2 h-4 w-4" /> Select File
            </Button>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Beat Title</Label>
              <Input id="title" placeholder="Enter beat title" className="bg-zinc-900" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Select>
                <SelectTrigger id="genre" className="bg-zinc-900">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trap">Trap</SelectItem>
                  <SelectItem value="hiphop">Hip Hop</SelectItem>
                  <SelectItem value="rnb">R&B</SelectItem>
                  <SelectItem value="pop">Pop</SelectItem>
                  <SelectItem value="drill">Drill</SelectItem>
                  <SelectItem value="lofi">Lo-Fi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bpm">BPM: {bpm[0]}</Label>
              <Slider id="bpm" min={60} max={200} step={1} value={bpm} onValueChange={setBpm} className="py-4" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="key">Key</Label>
              <Select>
                <SelectTrigger id="key" className="bg-zinc-900">
                  <SelectValue placeholder="Select key" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="c-major">C Major</SelectItem>
                  <SelectItem value="c-minor">C Minor</SelectItem>
                  <SelectItem value="d-major">D Major</SelectItem>
                  <SelectItem value="d-minor">D Minor</SelectItem>
                  <SelectItem value="e-major">E Major</SelectItem>
                  <SelectItem value="e-minor">E Minor</SelectItem>
                  {/* Add more keys as needed */}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe your beat..." className="bg-zinc-900 min-h-[120px]" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input id="tags" placeholder="trap, dark, melodic, etc." className="bg-zinc-900" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image</Label>
            <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center">
              <p className="text-zinc-400 mb-4">Upload a square image (JPG or PNG)</p>
              <Button variant="outline">Select Image</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="basic-price">Basic License Price ($)</Label>
              <Input id="basic-price" type="number" placeholder="29.99" className="bg-zinc-900" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="premium-price">Premium License Price ($)</Label>
              <Input id="premium-price" type="number" placeholder="49.99" className="bg-zinc-900" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exclusive-price">Exclusive License Price ($)</Label>
              <Input id="exclusive-price" type="number" placeholder="299.99" className="bg-zinc-900" />
            </div>
          </div>

          <div className="pt-4">
            <Button size="lg" className="w-full md:w-auto">
              <Upload className="mr-2 h-4 w-4" /> Upload Beat
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

