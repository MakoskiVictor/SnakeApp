import { type Coordenate } from '../types/types'

export const checkEatsFood = (
  head: Coordenate,
  food: Coordenate,
  area: number // --> el area es porque la coordenada ex muy exacta, -> debenmos redondearla
): boolean => {
  const distanceBetweenFoodAndSnakeX: number = Math.abs(head.x - food.x)
  const distanceBetweenFoodAndSnakeY: number = Math.abs(head.y - food.y)

  return (
    distanceBetweenFoodAndSnakeX < area && distanceBetweenFoodAndSnakeY < area
  )
}
