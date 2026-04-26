import { defineStore } from 'pinia'
import { ref } from 'vue'
import { analyzeRecording } from '@/services/analyzer'

export const useAnalysisStore = defineStore('analysis', () => {
  const isAnalyzing = ref(false)
  const lastResult = ref(null)
  const error = ref(null)

  async function runAnalysis({ tulId, source }) {
    isAnalyzing.value = true
    error.value = null
    try {
      lastResult.value = await analyzeRecording({ tulId, source })
    } catch (e) {
      error.value = e?.message ?? 'Analysis failed'
    } finally {
      isAnalyzing.value = false
    }
  }

  return { isAnalyzing, lastResult, error, runAnalysis }
})
