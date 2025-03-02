import { NextResponse } from 'next/server'
import { join } from 'path'
import { readFile } from 'fs/promises'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get beat info from MongoDB
    const client = await clientPromise
    const db = client.db('beatstore')
    const beat = await db.collection('beats').findOne({ _id: new ObjectId(params.id) })

    if (!beat) {
      return NextResponse.json({ error: 'Beat not found' }, { status: 404 })
    }

    // Get the audio file path
    const audioPath = join(process.cwd(), 'public', beat.audioUrl)

    try {
      // Read the audio file
      const audioBuffer = await readFile(audioPath)

      // Create response with appropriate headers
      const response = new NextResponse(audioBuffer)
      response.headers.set('Content-Type', 'audio/mpeg')
      response.headers.set('Content-Disposition', `attachment; filename="${beat.title} - Demo.mp3"`)

      return response
    } catch (error) {
      console.error('File read error:', error)
      return NextResponse.json({ error: 'Failed to read audio file' }, { status: 500 })
    }
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Failed to process download' }, { status: 500 })
  }
} 