import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Food} from "../engine/food";
import {outsideGrid} from "../engine/game-board-grid.util";
import {Snake, SNAKE_SPEED} from "../engine/snake";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {

  lastRenderTime = 0
  gameOver = false
  gameBoard:any
  SNAKE_SPEED = 12
  snake = new Snake()
  food = new Food(this.snake)

  constructor() { }

  ngOnInit(): void {
    this.snake.listenToInputs()
  }

  ngAfterViewInit(){
    this.gameBoard = document.querySelector('.game-board')
    window.requestAnimationFrame(this.start.bind(this))
  }

  start(currentTime: any){
    if(this.gameOver) return console.log('game over')

    window.requestAnimationFrame(this.start.bind(this))
    const secondSinceLastRender = (currentTime - this.lastRenderTime) / 1000
    if(secondSinceLastRender < 1 / this.snakeSpeed) return
    this.lastRenderTime = currentTime
    this.update()
    this.draw()
  }

  get snakeSpeed(){
    const score = this.food.currentScore
    // if(score < 10) return 10
    // if(score > 10 && score < 15) return 12
    // if(score > 15 && score < 20) return 15
    return SNAKE_SPEED
  }

  update(){
    this.snake.update()
    this.food.update()
    this.checkDeath()
  }
  draw(){
    this.gameBoard.innerHTML = ''
    this.snake.draw(this.gameBoard)
    this.food.draw(this.gameBoard)
  }

  dpadMovement(direction: string){
    this.snake.input.setDirection(direction)
  }

  checkDeath(){
    this.gameOver = outsideGrid(this.snake.getSnakeHead() || this.snake.snakeIntersection())
    if(!this.gameOver) return
    this.gameBoard.classList.add('blur')
  }

  restart(){
    window.location.reload()
  }
}
