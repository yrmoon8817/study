import App from './App.js';
import BoundingBox from './BoundingBox.js';
import { randomNumBetween } from './Utils3.js';

export default class Wall {
  
    constructor(config){
      this.img= document.querySelector('#wall-img');
      this.type = config.type; //'big', 'small'
      switch(this.type){
        case 'BIG' : 
          this.sizeX = 18/30
          this.sx=this.img.width * (9/30);
          break;
          case 'SMALL':
          this.sizeX = 9/30
          this.sx=this.img.width * (0/30);
          break;
      }
      this.width = App.height * this.sizeX;
      this.height= App.height;
      this.gapY=randomNumBetween(App.height * 0.25, App.height * 0.55);
      this.x=App.width;
      this.vx = -5
      // -this.height
      // App.height - this.gapY - this.height
      this.y1 = -this.height + randomNumBetween(30, App.height - this.gapY- 30);
      this.y2 = this.y1 + this.height + this.gapY;
      this.generatedNext=false;
      this.gapNextX = App.width * randomNumBetween(0.4, 0.55);
      this.boundingBox1 = new BoundingBox(this.x + 30, this.y1+30, this.width - 40, this.height- 40);
      this.boundingBox2 = new BoundingBox(this.x + 30, this.y2+30, this.width - 40, this.height- 40);
    }
    get isOutside(){
      return this.x + this.width < 0
    }
    get canGenerateNext(){
      return(
        !this.generatedNext && 
        this.x + this.width < this.gapNextX
      )
    }
    update(){
      this.x += this.vx;
      this.boundingBox1.x=this.boundingBox2.x=this.x +30
    }
    
    isColliding(target){
      // 두가지 벽중 하나라도 충돌한다면.
      return(
        this.boundingBox1.isColliding(target) ||
        this.boundingBox2.isColliding(target)
      )
    }
    
    draw(){
      App.context.drawImage(
        this.img,
        this.sx, 0, this.img.width * this.sizeX, this.img.height,
        this.x, this.y1 , this.width, this.height
      )
      App.context.drawImage(
        this.img,
        this.sx, 0, this.img.width * this.sizeX, this.img.height,
        this.x, this.y2 , this.width, this.height
      )
      // this.boundingBox1.draw();
      // this.boundingBox2.draw();
    }
  
}