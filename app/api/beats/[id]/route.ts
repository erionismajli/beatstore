import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { Beat } from '@/lib/types'

// GET /api/beats/[id] - Get a single beat
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db('beatstore')
    const beat = await db.collection('beats').findOne({ _id: new ObjectId(params.id) })

    if (!beat) {
      return NextResponse.json({ error: 'Beat not found' }, { status: 404 })
    }

    return NextResponse.json(beat)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch beat' }, { status: 500 })
  }
}

// PUT /api/beats/[id] - Update a beat
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db('beatstore')
    const updateData = await request.json()

    const result = await db.collection('beats').updateOne(
      { _id: new ObjectId(params.id) },
      { 
        $set: { 
          ...updateData,
          updatedAt: new Date()
        } 
      }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Beat not found' }, { status: 404 })
    }

    const updatedBeat = await db.collection('beats').findOne({ _id: new ObjectId(params.id) })
    return NextResponse.json(updatedBeat)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update beat' }, { status: 500 })
  }
}

// DELETE /api/beats/[id] - Delete a beat
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db('beatstore')
    const result = await db.collection('beats').deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Beat not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Beat deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete beat' }, { status: 500 })
  }
} 