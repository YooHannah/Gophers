import template from "./template.js";
import dom from "./dom.js";
import { Mouse } from "./model.js";
import Score from "./score.js";
import Music from "./music.js";
class Game {
  constructor() {
    this.background = document.body; // 游戏背景
    this.pois = [[60,150],[60,300],[60,420],[110,100],[110,220],[110,375],[110,520],
    [175,120],[175,300],[175,470],[230,30],[230,210],[230,400],[230,560],[300,60],
    [300,290],[300,530]]
    this.initStartUI(); // 初始化开始界面
  }
  /**
   * 初始化游戏界面
   */
  initStartUI() {
    let el = dom.create(template.game_start);
    let btn = el.querySelector(".btn");
    dom.insert(el);
    btn.addEventListener("click", e => {
      this.start();
      el.remove();
      el = null;
      btn = null;
    });
  }
  start() {
    this.background.style.background = 'url(../img/bg.png) no-repeat left top'
    this.background.style.backgroundSize = '100% 400px;'
    this.initMusic();
    this.startEnemy();
    this.score = new Score(); // 计分器
    document.addEventListener("click", e => {
      if(e.target.className.includes('mouse')){
        this.bzMusic && this.bzMusic.play();
        e.target.remove()
        this.score.update();
      }
    })
  }
  restart(){
    let el = dom.create(template.game_restart);
    let btn = el.querySelector(".btn");
    dom.insert(el);
    btn.addEventListener("click", e => {

      this.initMusic();
      this.startEnemy();
      this.score = new Score(); // 计分器
      //不能直接this.start,否则会增加监听事件，导致计分加倍
      el.remove();
      el = null;
      btn = null;
    });
  }
  startEnemy() {
    let createEnemy = () => {
      console.log(111)
      let count = parseInt(Math.random()*17)
      let arr = []
      for(let i = 0;i<count;i++){
        let random = parseInt(Math.random()*16)
        if(!arr.includes(random)){
          arr.push(random)
          let poi = this.pois[random]
          let enemy = new Mouse()
          enemy.el.style.top = poi[0]+'px'
          enemy.el.style.left = poi[1]+'px'
        }
      }
    };
    this.enemyTimer = setInterval(createEnemy, 3000);
    let stop = ()=>{
      let aa = ()=>{
        this.bgMusic.audio.pause()
        this.endMusic.audio.play()
        alert('游戏结束，您总共获得分数为：'+this.score.fractionCount)
        let pane = dom.getElement(".fraction")
        pane.remove()
        this.restart()
      }
      let doms = dom.getElements('.mouse')
      for(let i=0;i<doms.length;i++){
        doms[i].remove()
      }
      setTimeout(aa,0)
      clearInterval(this.enemyTimer)
    }
    setTimeout(stop,10000)
  }
  initMusic() {
    this.endMusic = new Music("game_over");
    this.bzMusic = new Music("bullet");
    this.bgMusic = new Music("game_bg");
    this.bgMusic.audio.autoplay = true;
    this.bgMusic.audio.loop = true;
    this.bgMusic.audio.load();
  }
}

export default Game;