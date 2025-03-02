"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, ShoppingCart } from "lucide-react"

interface Beat {
  id: string
  title: string
  genre: string
  bpm: number
  price: number
  image: string
  audioUrl: string
}

interface BeatCardProps {
  beat: Beat
}

export function BeatCard({ beat }: BeatCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(beat.audioUrl)
    audioRef.current = audio

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e)
      console.log('Attempted to load audio from:', beat.audioUrl)
      setError('Failed to load audio')
    })

    audio.addEventListener('ended', () => {
      setIsPlaying(false)
    })

    return () => {
      audio.pause()
      audio.currentTime = 0
      audio.remove()
    }
  }, [beat.audioUrl])

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      console.log('Playing audio from:', beat.audioUrl)
      audioRef.current.play().catch(err => {
        console.error('Playback error:', err)
        setError('Failed to play audio')
      })
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <Link href={`/beats/${beat.id}`}>
      <Card className="overflow-hidden bg-card border-zinc-800 transition-all hover:border-primary hover:shadow-lg group">
        <div className="relative aspect-square grain-image">
          <img src={beat.image || "/placeholder.svg"} alt={beat.title} className="object-cover w-full h-full" />
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-3 right-3 rounded-full bg-black/70 hover:bg-primary"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          {error && (
            <div className="absolute bottom-12 right-3 bg-red-500/90 text-white text-xs px-2 py-1 rounded">
              {error}
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-heading line-clamp-1">{beat.title}</h3>
              <p className="text-sm text-zinc-400">
                {beat.genre} • {beat.bpm} BPM
              </p>
            </div>
            <p className="font-heading text-primary">${beat.price}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2 rounded-none border-zinc-800 group-hover:border-primary"
          >
            <ShoppingCart className="mr-2 h-3 w-3" /> Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}

