import { createI18n } from 'vue-i18n'

const messages = {
  es: {
    appTitle: 'Tul Analyzer',
    pickTul: 'Elige un tul',
    movements: 'movimientos',
    selectPrompt: 'Selecciona un tul para empezar.',
    input: 'Entrada',
    sourceUpload: 'Archivo',
    sourceWebcam: 'Cámara en vivo',
    sourceUrl: 'URL / stream',
    videoUrl: 'URL del video',
    runAnalysis: 'Analizar',
    score: 'Puntaje',
    criterion: 'Criterio',
    scoreLabel: 'Puntaje',
    pointers: 'Sugerencias',
    analysisFailed: 'Análisis fallido',
  },
  en: {
    appTitle: 'Tul Analyzer',
    pickTul: 'Pick a tul',
    movements: 'movements',
    selectPrompt: 'Select a tul to get started.',
    input: 'Input',
    sourceUpload: 'File upload',
    sourceWebcam: 'Live webcam',
    sourceUrl: 'URL / stream',
    videoUrl: 'Video URL',
    runAnalysis: 'Run analysis',
    score: 'Score',
    criterion: 'Criterion',
    scoreLabel: 'Score',
    pointers: 'Pointers',
    analysisFailed: 'Analysis failed',
  },
}

export default createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages,
})
