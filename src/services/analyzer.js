// Service layer for the ML/CV analysis backend.
// The real implementation will POST video frames or a recording reference
// to an external API (configured via VITE_ANALYZER_API_URL) and stream back
// per-movement scoring. For now we return a deterministic mock so the UI
// can be developed independently.

import { SCORING_CRITERIA } from '@/data/tuls'

const API_URL = import.meta.env.VITE_ANALYZER_API_URL

export async function analyzeRecording({ tulId, source }) {
  if (API_URL) {
    const res = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tulId, source }),
    })
    if (!res.ok) throw new Error(`Analyzer API error: ${res.status}`)
    return res.json()
  }
  return mockAnalyze({ tulId, source })
}

function mockAnalyze({ tulId, source }) {
  const breakdown = SCORING_CRITERIA.map((c) => ({
    ...c,
    score: Number((6 + Math.random() * 3).toFixed(1)),
    note: 'Mock evaluation — replace once analyzer API is wired up.',
  }))
  const overall = Number(
    (breakdown.reduce((s, c) => s + c.score, 0) / breakdown.length).toFixed(2),
  )
  return Promise.resolve({
    tulId,
    sourceType: source?.type ?? 'unknown',
    overall,
    breakdown,
    pointers: [
      'Lower stance on movement 7.',
      'Hip rotation lagging on the second turning kick.',
      'Breathing audible but mistimed on the final move.',
    ],
  })
}
