"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause } from "lucide-react"

interface BeatPlayerProps {
  audioUrl: string
}

export function BeatPlayer({ audioUrl }: BeatPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    console.log('Loading audio from:', audioUrl)
    const audio = new Audio(audioUrl)
    audioRef.current = audio

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration)
    })

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime)
    })

    audio.addEventListener('ended', () => {
      setIsPlaying(false)
      setCurrentTime(0)
    })

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e)
      console.log('Failed to load audio from:', audioUrl)
      setError('Failed to load audio file')
    })

    return () => {
      audio.pause()
      audio.currentTime = 0
      audio.remove()
    }
  }, [audioUrl])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      console.log('Playing audio from:', audioUrl)
      audioRef.current.play().catch(err => {
        console.error('Playback error:', err)
        setError('Failed to play audio')
      })
    }
    setIsPlaying(!isPlaying)
  }

  const handleSliderChange = (value: number[]) => {
    if (!audioRef.current) return
    const newTime = value[0]
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-card border border-zinc-800 p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </Button>

        <div className="flex-1 space-y-1">
          <Slider
            value={[currentTime]}
            max={duration}
            step={0.1}
            onValueChange={handleSliderChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-zinc-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}

