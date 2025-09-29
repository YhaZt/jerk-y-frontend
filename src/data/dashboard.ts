import type { ProcessStage, SensorMetric } from '../types/telemetry'

export const BASE_METRICS: SensorMetric[] = [
  {
    id: 'temperature',
    label: 'Chamber Temperature',
    unit: '°C',
    value: 64.5,
    previousValue: 64.5,
    targetRange: [63, 68],
    trend: 'steady',
  },
  {
    id: 'humidity',
    label: 'Relative Humidity',
    unit: '%',
    value: 32.1,
    previousValue: 32.1,
    targetRange: [28, 35],
    trend: 'steady',
  },
  {
    id: 'airflow',
    label: 'Air Velocity',
    unit: 'm/s',
    value: 1.8,
    previousValue: 1.8,
    targetRange: [1.5, 2.1],
    trend: 'steady',
  },
  {
    id: 'smoke-density',
    label: 'Smoke Density',
    unit: 'ppm',
    value: 14,
    previousValue: 14,
    targetRange: [10, 18],
    trend: 'steady',
  },
  {
    id: 'pressure',
    label: 'Chamber Pressure',
    unit: 'kPa',
    value: 99.2,
    previousValue: 99.2,
    targetRange: [98, 101],
    trend: 'steady',
  },
  {
    id: 'moisture',
    label: 'Product Moisture',
    unit: '%',
    value: 27.3,
    previousValue: 27.3,
    targetRange: [24, 30],
    trend: 'steady',
  },
]

export const PROCESS_STAGES: ProcessStage[] = [
  {
    id: 'prep',
    name: 'Prep & Marinade',
    description: 'Seasoning locked in and racks loaded.',
    completesAt: 18,
  },
  {
    id: 'drying',
    name: 'Drying Ramp',
    description: 'Gradually raising heat and airflow.',
    completesAt: 52,
  },
  {
    id: 'finishing',
    name: 'Finishing Cure',
    description: 'Holding precise climate to reach target moisture.',
    completesAt: 88,
  },
  {
    id: 'rest',
    name: 'Cooling & Rest',
    description: 'Stabilizing texture before packaging.',
    completesAt: 100,
  },
]
