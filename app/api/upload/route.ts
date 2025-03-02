import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import clientPromise from '@/lib/mongodb'

async function ensureDirectoryExists(path: string) {
  try {
    await mkdir(path, { recursive: true })
  } catch (error) {
    // Directory might already exist, that's fine
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    // Handle audio file
    const audioFile = formData.get('audio') as File
    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 })
    }

    // Handle cover image
    const imageFile = formData.get('image') as File
    if (!imageFile) {
      return NextResponse.json({ error: 'No cover image provided' }, { status: 400 })
    }

    // Create unique filenames
    const audioFileName = `${Date.now()}-${audioFile.name}`
    const imageFileName = `${Date.now()}-${imageFile.name}`

    // Ensure upload directories exist
    const audioDir = join(process.cwd(), 'public', 'uploads', 'audio')
    const imageDir = join(process.cwd(), 'public', 'uploads', 'images')
    await ensureDirectoryExists(audioDir)
    await ensureDirectoryExists(imageDir)

    // Save files to public directory
    const audioBytes = await audioFile.arrayBuffer()
    const imageBytes = await imageFile.arrayBuffer()

    const audioPath = join(audioDir, audioFileName)
    const imagePath = join(imageDir, imageFileName)

    await writeFile(audioPath, Buffer.from(audioBytes))
    await writeFile(imagePath, Buffer.from(imageBytes))

    // Get other form data
    const title = formData.get('title') as string
    const genre = formData.get('genre') as string
    const bpm = parseInt(formData.get('bpm') as string)
    const key = formData.get('key') as string
    const description = formData.get('description') as string
    const tags = (formData.get('tags') as string).split(',').map(tag => tag.trim())
    const basicPrice = parseFloat(formData.get('basicPrice') as string)
    const premiumPrice = parseFloat(formData.get('premiumPrice') as string)
    const exclusivePrice = parseFloat(formData.get('exclusivePrice') as string)

    // Save to MongoDB
    const client = await clientPromise
    const db = client.db('beatstore')
    
    const beat = {
      title,
      genre,
      bpm,
      key,
      description,
      tags,
      audioUrl: `/uploads/audio/${audioFileName}`,
      image: `/uploads/images/${imageFileName}`,
      pricing: {
        basic: basicPrice,
        premium: premiumPrice,
        exclusive: exclusivePrice
      },
      isDeleted: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection('beats').insertOne(beat)

    return NextResponse.json({ 
      message: 'Beat uploaded successfully',
      beatId: result.insertedId 
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload beat' },
      { status: 500 }
    )
  }
} 