class Animatable {
  constructor (canvas) {
    const canvasEl = document.getElementById(canvas)
    this.context = canvasEl.getContext('2d')
    this.canvasWidth = canvas.width
    this.canvasHeight = canvas.height
    this.ms = 300

    this.clear = this.clear.bind(this)
    this.delay = this.delay.bind(this)
    this.drawFrame = this.drawFrame.bind(this)
    this.frame = this.frame.bind(this)
  }

  clear () {
    console.log('[Animatable] clear()')
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  delay () {
    console.log('[Animatable] delay()')
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, this.ms)
    })
  }

  drawFrame (image, width, height, frame) {
    const {
      clear,
      delay
    } = this

    const draw = () => requestAnimationFrame(() => {
      console.log('[Animatable] draw')

      // TODO: 이미지 출력 좌표 수정
      this.context.drawImage(
        image,
        ...frame,
        width, height,
        ...frame,
        width, height
      )
    })

    function* animation() {
      yield clear
      yield draw
      yield delay()
    }

    return animation.call(this)
  }

  frame (animation) {
    const {
      image,
      frameWidth,
      frameHeight,
      frames
    } = animation

    return frame => {
      return this.drawFrame(image, frameWidth, frameHeight, frames[frame])
    }
  }
}