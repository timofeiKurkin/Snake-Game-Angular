import {randomGridPosition} from "./game-board-grid.util";

export class Food {
  // скорость расширения, т.е чему будет равен один поинт к увеличению змейки
  EXPANSION_RATE = 1;

  // счетчик поинтов
  score = 0;

  //
  food: any;

  //
  snake;


  constructor(snake: any) {
    this.snake = snake;
    this.food = this.getRandomFoodPosition();
  }

  // обнавление змейки при подобранном поинте, и добавление поинта к общему счетчику
  update() {
    if (this.snake.onSnake(this.food)) {
      this.snake.expandSnake(this.EXPANSION_RATE);
      this.food = this.getRandomFoodPosition();
      this.addScore = 1
    }
  }


  // рисование поинта
  draw(gameBoard: any) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.food.y;
    foodElement.style.gridColumnStart = this.food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
  }

  // назначение рандомной позиции нового поинта
  getRandomFoodPosition() {
    //объявление пременной с новой позицией
    let newFoodPosition;
    // цикл с проверкой
    while (newFoodPosition == null || this.snake.onSnake(newFoodPosition)) {
      newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
  }
  // сетер прибавляющий
  set addScore(val: number) {
    this.score+=val;
  }

  // возращает счетчик
  get currentScore() {
    return this.score;
  }
}
