import { type Coordenate } from '../types/types'

interface Boundaries {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}

export const checkGameOver = (snakeHead: Coordenate, boundaries: Boundaries): boolean => {
  return (
    snakeHead.x < boundaries.xMin ||
    snakeHead.x > boundaries.xMax ||
    snakeHead.y < boundaries.yMin ||
    snakeHead.y > boundaries.yMax
  )
}
