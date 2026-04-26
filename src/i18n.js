import { createI18n } from 'vue-i18n'

const messages = {
  es: {
    appTitle: 'ITF Tul Analysis',
    pickTul: 'Elige un tul',
    movements: 'movimientos',
    tabAnalyze: 'Analizar',
    tabInfo: 'Sobre el tul',
    selectTulForInfo: 'Selecciona un tul para ver su información.',
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
    appTitle: 'ITF Tul Analysis',
    pickTul: 'Pick a tul',
    movements: 'movements',
    tabAnalyze: 'Analyze',
    tabInfo: 'About',
    selectTulForInfo: 'Select a tul to see its information.',
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
