"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Upload, Music, X } from "lucide-react"
import { toast } from "sonner"

export default function UploadPage() {
  const router = useRouter()
  const [bpm, setBpm] = useState<number[]>([120])
  const [isUploading, setIsUploading] = useState(false)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleAudioDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && (file.type === 'audio/mpeg' || file.type === 'audio/wav' || file.type === 'audio/flac')) {
      setAudioFile(file)
    }
  }

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!audioFile || !imageFile) {
      toast.error('Please upload both an audio file and a cover image')
      return
    }

    setIsUploading(true)
    const formData = new FormData(e.target as HTMLFormElement)
    formData.append('audio', audioFile)
    formData.append('image', imageFile)
    formData.append('bpm', bpm[0].toString())

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      toast.success('Beat uploaded successfully')
      router.push('/beats')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload beat')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload New Beat</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            className="bg-zinc-900 rounded-lg p-6 mb-8"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleAudioDrop}
          >
            <div className="border-2 border-dashed border-zinc-700 rounded-lg p-10 text-center">
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/mpeg,audio/wav,audio/flac"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && setAudioFile(e.target.files[0])}
              />
              {audioFile ? (
                <div className="flex items-center justify-center gap-2">
                  <Music className="h-6 w-6 text-primary" />
                  <span className="font-medium">{audioFile.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setAudioFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Music className="h-12 w-12 mx-auto mb-4 text-zinc-500" />
                  <h3 className="text-lg font-medium mb-2">Drag and drop your beat file</h3>
                  <p className="text-zinc-400 mb-4">MP3, WAV, or FLAC. Max 50MB.</p>
                  <Button type="button" onClick={() => audioInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Select File
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Beat Title</Label>
              <Input id="title" name="title" placeholder="Enter beat title" className="bg-zinc-900" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Select name="genre" required>
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
              <Slider 
                id="bpm" 
                name="bpm"
                min={60} 
                max={200} 
                step={1} 
                value={bpm} 
                onValueChange={setBpm} 
                className="py-4" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="key">Key</Label>
              <Select name="key">
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
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description"
              placeholder="Describe your beat..." 
              className="bg-zinc-900 min-h-[120px]" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input 
              id="tags" 
              name="tags"
              placeholder="trap, dark, melodic, etc." 
              className="bg-zinc-900" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image</Label>
            <div 
              className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImageDrop}
            >
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && setImageFile(e.target.files[0])}
              />
              {imageFile ? (
                <div className="flex items-center justify-center gap-2">
                  <img 
                    src={URL.createObjectURL(imageFile)} 
                    alt="Cover preview" 
                    className="h-20 w-20 object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setImageFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-zinc-400 mb-4">Upload a square image (JPG or PNG)</p>
                  <Button type="button" variant="outline" onClick={() => imageInputRef.current?.click()}>
                    Select Image
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="basicPrice">Basic License Price ($)</Label>
              <Input 
                id="basicPrice" 
                name="basicPrice"
                type="number" 
                placeholder="29.99" 
                className="bg-zinc-900"
                step="0.01"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="premiumPrice">Premium License Price ($)</Label>
              <Input 
                id="premiumPrice" 
                name="premiumPrice"
                type="number" 
                placeholder="49.99" 
                className="bg-zinc-900"
                step="0.01"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exclusivePrice">Exclusive License Price ($)</Label>
              <Input 
                id="exclusivePrice" 
                name="exclusivePrice"
                type="number" 
                placeholder="299.99" 
                className="bg-zinc-900"
                step="0.01"
                required 
              />
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isUploading}>
              {isUploading ? (
                "Uploading..."
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Upload Beat
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

