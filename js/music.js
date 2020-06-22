// 音乐
class Music {
  constructor(name) {
    this.audio = new Audio();
    this.load(name);
  }
  load(name) {
    this.audio.src = `../music/${name}.mp3`;
  }
  play() {
    // readyState == 0 无音频就绪信息
    // readyState == 1 无元数据
    // readyState == 2 无数据播放下一秒/帧
    // readyState == 3 当前及下一秒是可以用
    // readyState == 4 可用数据足以开始播放资源准备完毕

    if (this.audio.readyState === 4) {
      this.audio.play();
    }
  }
  pause() {
    this.audio.pause();
  }
}

export default Music;
