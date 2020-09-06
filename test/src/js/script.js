"use strict";

/* let obj = {
    lay: "usu",
    key: "yuy"
};

let {lay, key} = obj;

console.log(lay); */

console.log("Начало загрузки");

/* setTimeout(() => {
    console.log("Получение данных");
    const product = 2000

    setTimeout(() => {
        console.log(product);
    }, 2000);
}, 2000);
 */
let req = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Получение данных");
        const product = 2000;
    
        resolve(product);
    }, 2000);
}).then((product) => {
    setTimeout(() => {
        console.log(product);
    }, 2000);
});

/* function Shape() {
    this.x = 0;
    this.y = 0;
  }
  
  // метод суперкласса
  Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Фигура переместилась.');
  };
  
  // Rectangle — подкласс
  function Rectangle() {
    Shape.call(this);
    this.z = 0; // вызываем конструктор суперкласса
  }
  
  // подкласс расширяет суперкласс
  Rectangle.prototype = Object.create(Shape.prototype);
  Rectangle.prototype.constructor = Rectangle;
  
  var rect = new Rectangle();

  console.log(rect);
  
  console.log('Является ли rect экземпляром Rectangle? ' + (rect instanceof Rectangle)); // true
  console.log('Является ли rect экземпляром Shape? ' + (rect instanceof Shape)); // true
  rect.move(1, 1); // выведет 'Фигура переместилась.' */
/* const blind = {
    name: 'John',
    surname: 'Carther',
    jump: function () {

        console.log(this);

        let twiceJump = function () {
            console.log(this);

            let tripleJump = () => {
                console.log(this);
            };

            tripleJump();
        };

        twiceJump();
    } 
};

blind.jump();

function Mk2 (health, armor) {
    this.health = health;
    this.armor = armor;
}

let john = {
    health: 100,
    weapon: "SAW"
};

Mk2.prototype.exit = () => console.log("AAA");

let pre = new Mk2(200, 100);

console.log(pre);
pre.exit();

console.log(Mk2.prototype); */