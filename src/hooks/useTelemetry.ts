import { useEffect, useMemo, useState } from 'react'
import { BASE_METRICS, PROCESS_STAGES } from '../data/dashboard'
import type {
  ChamberStatus,
  ProcessStage,
  SensorMetric,
  SensorStatus,
  StageStatus,
} from '../types/telemetry'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export const calculateStatus = (
  value: number,
  [min, max]: [number, number],
): SensorStatus => {
  if (value >= min && value <= max) {
    return 'good'
  }

  const tolerance = (max - min) * 0.2
  if (value >= min - tolerance && value <= max + tolerance) {
    return 'warning'
  }

  return 'critical'
}

const updateMetricReading = (metric: SensorMetric): SensorMetric => {
  const [min, max] = metric.targetRange
  const safeSpan = max - min
  const allowableMin = min - safeSpan * 0.7
  const allowableMax = max + safeSpan * 0.7
  const variance = safeSpan * 0.08
  const delta = (Math.random() - 0.5) * 2 * variance

  let nextValue = metric.value + delta
  if (nextValue < allowableMin) {
    nextValue = allowableMin + Math.random() * variance
  }
  if (nextValue > allowableMax) {
    nextValue = allowableMax - Math.random() * variance
  }

  const rounded = Number(nextValue.toFixed(1))
  const trend = ((): SensorMetric['trend'] => {
    if (rounded > metric.value + 0.3) return 'up'
    if (rounded < metric.value - 0.3) return 'down'
    return 'steady'
  })()

  return {
    ...metric,
    previousValue: metric.value,
    value: rounded,
    trend,
  }
}

export const getGaugeFillPercent = (value: number, [min, max]: [number, number]): number => {
  const span = max - min
  const displayMin = min - span * 0.5
  const displayMax = max + span * 0.5
  const percent = ((value - displayMin) / (displayMax - displayMin)) * 100
  return Math.round(clamp(percent, 0, 100))
}

export const formatRange = ([min, max]: [number, number], unit: string) =>
  `${min.toFixed(min % 1 === 0 ? 0 : 1)}–${max.toFixed(max % 1 === 0 ? 0 : 1)} ${unit}`

export const useTelemetry = () => {
  const [metrics, setMetrics] = useState<SensorMetric[]>(() =>
    BASE_METRICS.map((metric) => ({ ...metric })),
  )
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [batchProgress, setBatchProgress] = useState<number>(57.5)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMetrics((current: SensorMetric[]) =>
        current.map((metric: SensorMetric) => updateMetricReading(metric)),
      )
      setBatchProgress((progress: number) => clamp(progress + Math.random() * 0.9, 0, 100))
      setLastUpdated(new Date())
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  const stages = useMemo(() => {
    return PROCESS_STAGES.map((stage, index) => {
      const previousComplete = index === 0 ? 0 : PROCESS_STAGES[index - 1].completesAt
      let status: StageStatus

      if (batchProgress >= stage.completesAt) {
        status = 'complete'
      } else if (batchProgress >= previousComplete && batchProgress < stage.completesAt) {
        status = 'in-progress'
      } else {
        status = 'up-next'
      }

      return { ...stage, status }
    }) satisfies ProcessStage[]
  }, [batchProgress])

  const chamberStatus = useMemo<ChamberStatus>(() => {
    const criticalCount = metrics.filter(
      (metric: SensorMetric) => calculateStatus(metric.value, metric.targetRange) === 'critical',
    ).length
    const warningCount = metrics.filter(
      (metric: SensorMetric) => calculateStatus(metric.value, metric.targetRange) === 'warning',
    ).length

    if (criticalCount > 0) {
      return { label: 'Action Required', tone: 'critical' }
    }

    if (warningCount > 1) {
      return { label: 'Watch Closely', tone: 'warning' }
    }

    return { label: 'Stable & On Track', tone: 'good' }
  }, [metrics])

  return {
    metrics,
    lastUpdated,
    batchProgress,
    stages,
    chamberStatus,
  }
}
