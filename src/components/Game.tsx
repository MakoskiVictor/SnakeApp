import * as React from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { SafeAreaView, View } from 'react-native'

export function Game (): JSX.Element {
  return (
        <PanGestureHandler>
            <SafeAreaView>
                <View />
            </SafeAreaView>
        </PanGestureHandler>
  )
}
