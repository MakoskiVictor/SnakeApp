import { type Coordenate } from '../types/types'

export const randomFoodPosition = (maxX: number, maxY: number): Coordenate => {
  return {
    x: Math.floor(Math.random() * maxX),
    y: Math.floor(Math.random() * maxY)
  }
}
