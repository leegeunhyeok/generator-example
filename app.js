class App extends Animatable {
  constructor (canvas) {
    super(canvas)
    const idle = new Sprite('images/idle.png', 360, 120, 3, 1)
    const eat = new Sprite('images/eat.png', 640, 240, 4, 2)

    this.animations = {
      bounce: idle.get(0),
      candy: eat.get(0),
      burger: eat.get(1)
    }

    this.idle = this.idle.bind(this)
    this.eat = this.eat.bind(this)
    this.feed = this.feed.bind(this)
  }

  idle () {
    const frame = this.frame(this.animations.bounce)

    function* animation() {
      yield* frame(0)
      yield* frame(1)
      yield* frame(2)
      yield* frame(1)
      yield* frame(0)
    }

    return animation.call(this)
  }

  eat (food) {
    const frame = this.frame(this.animations[food])

    function* animation() {
        yield* frame(0)
        yield* frame(1)
        yield* frame(2)
        yield* frame(3)
    };

    return animation.call(this)
  }

  feed (food) {
    const {
      delay,
      eat
    } = this

    function* animation() {
      yield* eat(food)
      yield delay()
    }

    return animation.call(this)
  }
}
