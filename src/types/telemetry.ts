export type Trend = 'up' | 'down' | 'steady'

export type SensorStatus = 'good' | 'warning' | 'critical'

export type SensorMetric = {
  id: string
  label: string
  unit: string
  value: number
  previousValue: number
  targetRange: [number, number]
  trend: Trend
}

export type StageStatus = 'complete' | 'in-progress' | 'up-next'

export type ProcessStage = {
  id: string
  name: string
  description: string
  completesAt: number
  status?: StageStatus
}

export type ChamberStatus = {
  label: string
  tone: SensorStatus
}
