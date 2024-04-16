export enum Color {
  WHITE, BLACK
}

export function oppositeColor(color : Color) {
  return color === Color.WHITE ? Color.BLACK : Color.WHITE;
}