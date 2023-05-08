import { StyleSheet, Text } from 'react-native'
import { type Coordenate } from '../types/types'

function getRandomFruitEmoji (): string {
  const fruitEmojis = ['🍎', '🍊', '🍋', '🍇', '🍉', '🍓', '🍑', '🍍']
  const randomIndex = Math.floor(Math.random() * fruitEmojis.length)
  return fruitEmojis[randomIndex]
}

const fruit = getRandomFruitEmoji()

export function Food ({ x, y }: Coordenate): JSX.Element {
  return <Text style={[{ top: y * 10, left: x * 10 }, styles.food]}> { fruit } </Text>
}

const styles = StyleSheet.create({
  food: {
    width: 30,
    height: 30,
    borderRadius: 7,
    position: 'absolute'
  }
})
