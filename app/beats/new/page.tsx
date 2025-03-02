import { BeatForm } from '@/components/beat-form'

export default function NewBeatPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-heading mb-6">Add New Beat</h1>
      <div className="max-w-2xl mx-auto">
        <BeatForm />
      </div>
    </div>
  )
} 