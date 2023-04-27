import React from 'react'
// Requisito del gesture handler para que funcione
// import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler' // Para que el gesture funcione en Android

import { Game } from './src/components/Game'

export default function App (): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Game />
    </GestureHandlerRootView>
  )
}
