
import { useEffect, useState } from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import { Colors } from '../styles/colors'
import { Header } from './Header'
import { type Coordenate, Direction, type GestureEventType } from '../types/types'

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }]
const FOOD_INITIAL_POSITION = { x: 5, y: 20 }
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 }
const MOVE_INTERVAL = 50
const SCORE_INCREMENT = 10

export function Game (): JSX.Element {
  const [direction, setDirection] = useState<Direction>(Direction.Right)
  const [snake, setSnake] = useState<Coordenate[]>(SNAKE_INITIAL_POSITION)
  const [food, setFood] = useState<Coordenate>(FOOD_INITIAL_POSITION)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  /* console.log(direction, isGameOver) */

  useEffect(() => {
    if (!isGameOver) {
      const intervalID = setInterval(() => {
        moveSnake()
      }, MOVE_INTERVAL)
      return (): void => { clearInterval(intervalID) } // REVISAR SI VAN LAS LLAVES
    }
  }, [isGameOver])

  const moveSnake = (): void => {
    const snakeHead = snake[0]
    const newHead = { ...snakeHead }

    // Game is Over
    switch (direction) {
      case Direction.Up:
        newHead.y -= 1
        break
      case Direction.Down:
        newHead.y -= 1
        break
      case Direction.Left:
        newHead.x -= 1
        break
      case Direction.Right:
        newHead.x += 1
        break
      default:
        break
    }

    // Check if eats food
    setSnake([newHead, ...snake.slice(0, -1)]) // move snake
  }

  const handleGesture = (e: GestureEventType): void => {
    const { translationX, translationY } = e.nativeEvent

    // Para medir si el movimiento es mayor hacia los costados o arriba/abajo
    if (Math.abs(translationX) > Math.abs(translationY)) {
      // Eje X, ahora se determina si es izq o der
      if (translationX > 0) {
        setDirection(Direction.Right)
      } else {
        setDirection(Direction.Left)
      }
      // Eje Y, ahora determina si es arriba o abajo
      if (translationY > 0) {
        setDirection(Direction.Down)
      } else {
        setDirection(Direction.Up)
      }
    }
  }
  return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={ styles.container }>
              {/* <Header /> */}
              <View style={styles.boundaries}>
                <View style={styles.snake} />
              </View>
            </SafeAreaView>
        </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  // El flex 1 es para que tome toda la pantalla
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  // Límite de la pantalla
  boundaries: {
    flex: 1,
    borderWidth: 12,
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  snake: {
    width: 20,
    height: 20,
    backgroundColor: 'red'
  }
})
