'use client'

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DownloadButtonProps {
  beatId: string
}

export function DownloadButton({ beatId }: DownloadButtonProps) {
  const handleDownload = () => {
    window.location.href = `/api/beats/${beatId}/download`
  }

  return (
    <Button
      variant="outline"
      className="flex-1 rounded-none border-zinc-800 hover:bg-white/5 hover:border-primary"
      onClick={handleDownload}
    >
      <Download className="mr-2 h-4 w-4" /> Download Demo
    </Button>
  )
} 