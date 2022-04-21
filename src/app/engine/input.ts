// получение нажатой кнопки
export class UserKeyInput {
  // направление в начале
  inputDirection = {x: 0, y: 0}

  // последнее полученное направление от нажатой кнопки
  lastInputDirection = {x: 0, y: 0}

  // вешаем слушатель на нажаие кнопки
  getInputs() {
    window.addEventListener('keydown', e => {
      this.setDirection(e.key);
    })
  }

  // метод, который с помощью цикла проверяет, какая стрелка была нажата, и устанавливает направление. так же есть проверка, чтобы не менять направление назад
  setDirection(direction: String){
    switch (direction) {
      case 'ArrowUp':
        if (this.lastInputDirection.y !== 0) break;
        this.inputDirection = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
        if (this.lastInputDirection.y !== 0) break;
        this.inputDirection = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
        if (this.lastInputDirection.x !== 0) break;
        this.inputDirection = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
        if (this.lastInputDirection.x !== 0) break;
        this.inputDirection = { x: 1, y: 0 };
        break;
    }
  }

  // получает направление ввода
  getInputDirection(){
    this.lastInputDirection = this.inputDirection
    return this.inputDirection
  }
}
