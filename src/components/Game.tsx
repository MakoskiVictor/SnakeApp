
import { useEffect, useState } from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { SafeAreaView, View, StyleSheet, Text } from 'react-native'
import { Colors } from '../styles/colors'
import { Header } from './Header'
import { type Coordenate, Direction, type GestureEventType } from '../types/types'
import { Snake } from './Snake'
import { checkGameOver } from '../utils/checkGameOver'
import { Food } from './Food'
import { checkEatsFood } from '../utils/checksEatsFood'
import { randomFoodPosition } from '../utils/randomFoodPosition'

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }]
const FOOD_INITIAL_POSITION = { x: 10, y: 10 }
const GAME_BOUNDS = { xMin: 0, xMax: 44, yMin: 0, yMax: 93 }
const MOVE_INTERVAL = 50
const SCORE_INCREMENT = 10

export function Game (): JSX.Element {
  const [direction, setDirection] = useState<Direction>(Direction.Right)
  const [snake, setSnake] = useState<Coordenate[]>(SNAKE_INITIAL_POSITION)
  const [food, setFood] = useState<Coordenate>(FOOD_INITIAL_POSITION)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)

  /* console.log(direction, isGameOver) */

  useEffect(() => {
    if (!isGameOver) {
      const intervalID = setInterval(() => {
        !isPaused && moveSnake()
      }, MOVE_INTERVAL)
      return (): void => { clearInterval(intervalID) } // REVISAR SI VAN LAS LLAVES
    }
  }, [isGameOver, snake, isPaused])

  const moveSnake = (): void => {
    const snakeHead = snake[0]
    const newHead = { ...snakeHead }

    // Game is Over
    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver((prev) => !prev)
      return
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1
        break
      case Direction.Down:
        newHead.y += 1
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
    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax))
      setSnake([newHead, ...snake])
      setScore(score + SCORE_INCREMENT)
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]) // move snake
    }
  }

  const handleGesture = (event: GestureEventType): void => {
    const { translationX, translationY } = event.nativeEvent

    // Para medir si el movimiento es mayor hacia los costados o arriba/abajo
    if (Math.abs(translationX) > Math.abs(translationY)) {
      // Eje X, ahora se determina si es izq o der
      if (translationX > 0) {
        setDirection(Direction.Right)
      } else {
        setDirection(Direction.Left)
      }
    } else {
      // Eje Y, ahora determina si es arriba o abajo
      if (translationY > 0) {
        setDirection(Direction.Down)
      } else {
        setDirection(Direction.Up)
      }
    }
  }

  const pauseGame = (): void => {
    setIsPaused(!isPaused)
  }

  const reloadGame = (): void => {
    setSnake(SNAKE_INITIAL_POSITION)
    setFood(FOOD_INITIAL_POSITION)
    setIsGameOver(false)
    setScore(0)
    setDirection(Direction.Right)
    setIsPaused(false)
  }
  return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={ styles.container }>
              <Header
                reloadGame={reloadGame}
                isPaused={isPaused}
                pauseGame={pauseGame}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      color: Colors.primary
                    }}
                  >Score: {score} </Text>
              </Header>
              <View style={styles.boundaries}>
               <Snake snake={snake}/>
               <Food x={food.x} y={food.y} />
              </View>
            </SafeAreaView>
        </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  // El flex 1 es para que tome toda la pantalla
  container: {
    flex: 5,
    backgroundColor: Colors.primary,
    marginTop: 50
  },
  // Límite de la pantalla
  boundaries: {
    flex: 1,
    borderWidth: 12,
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  }
})
