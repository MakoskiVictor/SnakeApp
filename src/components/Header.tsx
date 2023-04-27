import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../styles/colors'

interface HeaderProps {
  reloadGame: () => void
  pauseGame: () => void
  children: JSX.Element
  isPaused: boolean
}

export function Header ({ reloadGame, pauseGame, children, isPaused }: HeaderProps): JSX.Element {
  return (
        <View style={styles.container}></View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 12,
    borderColor: Colors.primary
  }
})
