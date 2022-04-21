import {UserKeyInput} from "./input"

// сокорость
export const SNAKE_SPEED = 12

export class Snake {
  // позиция при старте
  snakeBody= [
    {x: 13, y: 13}
  ]

  // длина змейки при старте
  newSegments = 0

  // получаем нажатую кнопку
  input = new UserKeyInput()


  // обнавление змейки
  update(){
    // вызываем метод
    this.addSegments()

    // переменной присваевается нажатая кнопка
    const inputDirection = this.input.getInputDirection()

    // цикл прибавляющий к телу один подобранный поинт
    for(let i = this.snakeBody.length - 2;i >= 0; i--){
      this.snakeBody[i + 1] = {...this.snakeBody[i]}
    }

    // позиция икс
    this.snakeBody[0].x += inputDirection.x

    // позиция игрик
    this.snakeBody[0].y += inputDirection.y
  }

  // отрисовака тела змейки
  draw(gameBoard: any){
    // с помощью метода forEach переберается массив snakeBody. создается переменная которой присваевается создание элемента, также присваивается положение создания элемента, присваевается класс стилей
    this.snakeBody.forEach(segment => {
      const snakeElement = document.createElement('div')
      snakeElement.style.gridColumnStart = segment.x.toString()
      snakeElement.style.gridRowStart = segment.y.toString()
      snakeElement.classList.add('snake')
      gameBoard.appendChild(snakeElement)
    })
  }

  // слушатель нажатой кнопки
  listenToInputs(){
    this.input.getInputs()
  }

  // добавление к счетчику
  expandSnake(amount: number){
    this.newSegments+=amount
  }

  // позиция головы, чтобы не выходить за границы
  getSnakeHead(){
    return this.snakeBody[0]
  }

  // перекрещивание змейки по пути
  snakeIntersection(){
    return this.onSnake(this.snakeBody[4], {ignoreHead: true})
  }

  // позиция змейки во время игры
  onSnake(position: any, {ignoreHead = false}={}){
    return this.snakeBody.some((segment, index) => {
      if(ignoreHead && index === 0) return false
      return this.equalPosition(segment, position)
    })
  }

  equalPosition(pos1: any, pos2: any){
    return pos1.x === pos2.x && pos1.y === pos2.y
  }

  // добавляем сегмент
  addSegments(){
    for(let i =0; i < this.newSegments; i++){
      this.snakeBody.push({...this.snakeBody[this.snakeBody.length - 1]})
    }
    this.newSegments = 0
  }

}

