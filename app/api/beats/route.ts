import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { Beat, BeatInput } from '@/lib/types'
import { ObjectId } from 'mongodb'

// GET /api/beats - Get all beats
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('beatstore')
    const beats = await db.collection('beats')
      .find({ isDeleted: { $ne: 1 } })
      .toArray()
    return NextResponse.json(beats)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch beats' }, { status: 500 })
  }
}

// POST /api/beats - Create a new beat
export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db('beatstore')
    const beatInput: BeatInput = await request.json()

    const beat: Beat = {
      ...beatInput,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection('beats').insertOne(beat)
    const insertedBeat = await db.collection('beats').findOne({ _id: result.insertedId })
    
    return NextResponse.json(insertedBeat)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create beat' }, { status: 500 })
  }
} 