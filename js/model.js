import dom from "./dom.js";
import util from "./util.js";
// import Music from "./music.js";
import template from "./template.js";

/**
 * @class
 * @classdesc 渲染模型类
 */
class Model {
  constructor({ name, game, vx = 0, vy = 0, ax = 0, ay = 0 }) {
    this.vx = vx;
    this.vy = vy;
    this.ax = ax;
    this.ay = ay;
    this.el = null;
    this.width = 0;
    this.height = 0;
    this.name = name;
    this.game = game;
  }
  /**
   * 渲染模型
   * @param {String} tpl 模型字符串模板
   */
  render(tpl) {
    let el = dom.create(tpl);
    dom.insert(el);
    this.setProps(el);
  }
  /**
   * 设置 DOM 对象属性
   * @param {Element} el 待设置的 DOM 对象
   */
  setProps(el) {
    // 基础属性设置
    this.el = el;
    this.width = el._width;
    this.height = el._height;
    util.instancePointTransform(this, "x");
    util.instancePointTransform(this, "y");
  }
  // TODO: 添加模型可选值说明
  /**
   * 设置模型爆照效果
   * @param {enemyType} type 爆照效果类型 可选值：
   * 
   */
  explosion(type) {
    let extra = type ? `_${type}` : "";
    let effect = `${this.name + extra}_effect`;
    this.el.classList.add(effect);
  }
  /**
   * 将模型从容器中删除
   */
  remove() {
    this.el.remove();
  }
}

export class Mouse extends Model {
  constructor(game) {
    super({
      game,
      name: "mouse"
    });
    this.render(template.mouse);
    this.hide();
  }
  hide(){
    let temp = ()=>{
      this.el.remove()
    }
    setTimeout(temp,3000)
  }
} 