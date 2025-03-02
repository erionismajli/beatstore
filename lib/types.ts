import { ObjectId } from 'mongodb'

export interface Beat {
  _id?: ObjectId
  title: string
  genre: string
  bpm: number
  price: number
  image: string
  audioUrl: string
  description?: string
  tags?: string[]
  duration?: number
  key?: string
  createdAt: Date
  updatedAt: Date
}

export type BeatInput = Omit<Beat, '_id' | 'createdAt' | 'updatedAt'> 