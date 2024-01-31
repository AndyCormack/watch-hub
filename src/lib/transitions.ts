import { fly, type FlyParams } from 'svelte/transition'

const defaultDuration = 150
const defaultDistance = -30

export function flyDefault(node: HTMLElement, params: FlyParams = {}) {
  const duration = params.duration || defaultDuration // Your default duration
  const x = params.x || defaultDistance // Your default distance
  return fly(node, { x, duration, ...params })
}
