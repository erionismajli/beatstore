import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('beatstore')
    
    // Try to ping the database
    await db.command({ ping: 1 })
    
    return NextResponse.json({ 
      status: 'success',
      message: 'Successfully connected to MongoDB',
      database: 'beatstore'
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to connect to MongoDB',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 