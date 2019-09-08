class Sprite {
  constructor (src, width, height, column, row) {
    const image = new Image()
    image.src = src

    const frameWidth = width / column
    const frameHeight = height / row
    
    const frames = []
    for (let i = 0; i < row; i++) {
      frames.push([])

      for (let j = 0; j < column; j++) {
        frames[i][j] = [i * frameWidth, j * frameHeight]
      }
    }
    console.log(frames)

    this.sprite = {
      image,
      width,
      height,
      column,
      row,
      center: frameWidth / 2,
      count: column,
      frames,
      frameWidth,
      frameHeight
    }

    this.get = this.get.bind(this)
  }

  get (row) {
    return {
      ...this.sprite,
      frames: this.sprite.frames[row]
    }
  }
}
