export enum Direction {
  Right,
  Up,
  Left,
  Down
}

export interface GestureEventType {
  nativeEvent: { translationX: number, translationY: number }
}

export interface Coordenate {
  x: number
  y: number
}
