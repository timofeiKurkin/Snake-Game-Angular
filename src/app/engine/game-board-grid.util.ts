// размер сетки
const GRID_SIZE = 24

// рандомный спавн поинта
export function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1
  }
}

// границы сетки
export function outsideGrid(position: any) {
  return (
    position.x < 1 || position.x > GRID_SIZE ||
    position.y < 1 || position.y > GRID_SIZE
  )
}
