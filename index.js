class SampleApp {
  constructor (canvas) {
    this.app = new App(canvas)
    this.running = false
    this.userEvents = []

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.isPending = this.isPending.bind(this)
    this.loop = this.loop.bind(this)
    this.pushEvent = this.pushEvent.bind(this)
  }

  start () {
    console.log('[SampleApp] Running')
    this.running = true
    this.userEvents = []
    coroutine(this.loop())
  }

  stop () {
    console.log('[SampleApp] Stopped')
    this.running = false
  }

  isPending () {
    return this.userEvents.length
  }

  loop () {
    const {
      app,
      isPending,
      userEvents
    } = this

    return function* loop() {
      let idle = app.idle()
      let done = false

      while (this.running) {
        if (isPending()) {
          console.log('[SampleApp] User event found')
          const event = userEvents.shift()
          idle.return()
          // yield app.reset
          yield* event
        }

        while (!done && !isPending()) {
          const next = idle.next()
          done = next.done
          yield next.value
        }

        idle = app.idle()
        done = false
      }
    }.bind(this)
  }

  pushEvent (arg) {
    console.log('[pushEvent]', arg)
    const {
      app
    } = this

    if (arg.type === 'feed') {
      this.userEvents.push(app.feed(arg.option))
    }
  }
}

const sample = new SampleApp('canvas')

const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const feed1Button = document.getElementById('feed_1')
const feed2Button = document.getElementById('feed_2')

startButton.addEventListener('click', sample.start)
stopButton.addEventListener('click', sample.stop)

feed1Button.addEventListener('click', () => {
  sample.pushEvent({
    type: 'feed',
    option: 'candy'
  })
})

feed2Button.addEventListener('click', () => {
  sample.pushEvent({
    type: 'feed',
    option: 'burger'
  })
})
