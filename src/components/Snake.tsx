import { Fragment } from 'react'
import { type Coordenate } from '../types/types'
import { View, StyleSheet } from 'react-native'
import { Colors } from '../styles/colors'

interface SnakeProps {
  snake: Coordenate[]
}

export function Snake ({ snake }: SnakeProps): JSX.Element {
  return (
    <Fragment>
      { snake.map((segment: unknown, index: number) => {
        const segmentStyle = {
          left: segment.x * 10, // --> para ajustar el tamaño del view
          top: segment.y * 10
        }
        return <View key={index} style={[styles.snake, segmentStyle]} /> // --> Dos estilos van dentro de un array
      }) }
    </Fragment>
  )
}

const styles = StyleSheet.create({
  snake: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    position: 'absolute'
  }
})
