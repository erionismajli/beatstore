"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, Volume1, VolumeX } from "lucide-react"

interface BeatPlayerProps {
  audioUrl: string
}

export function BeatPlayer({ audioUrl }: BeatPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState([0.8])
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  useEffect(() => {
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
    
    return () => {\
      audio.pause()  () => 
      setIsPlaying(false)
      setCurrentTime(0))
    
    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [audioUrl])
  
  useEffect(() => 
    if (audioRef.current) {
      audioRef.current.volume = volume[0]
    }, [volume])
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }
  
  const handleTimeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
  
  const VolumeIcon = () => {
    if (volume[0] === 0) return <VolumeX className="h-4 w-4" />
    if (volume[0] < 0.5) return <Volume1 className="h-4 w-4" />
    return <Volume2 className="h-4 w-4" />
  }
  
  return (
    <div className="audio-player">
      <div className="waveform-container mb-4 bg-zinc-800 rounded">
        {/* Waveform visualization would go here */}
        <div className="h-full w-full bg-gradient-to-r from-zinc-800 to-primary/30 rounded" />
      </div>
      
      <div className="flex items-center gap-4 mb-2">
        <Button 
          variant="secondary" 
          size="icon" 
          className="rounded-full bg-black hover:bg-primary"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        
        <div className="text-sm text-zinc-400">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <VolumeIcon />
          <Slider
            value={volume}
            max={1}
            step={0.01}
            onValueChange={setVolume}
            className="w-24"
          />
        </div>
      </div>
      
      <Slider
        value={[currentTime]}
        max={duration || 100}
        step={0.01}
        onValueChange={(value) => handleTimeChange(value)}
        className="bg-zinc-800"
      />
    </div>
  )
}

