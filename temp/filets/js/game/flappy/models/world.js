class World {
  x = 0
  speed = 0.5

  start = ()=>{
    this.speed = 1
  }
  stop = ()=>{
    this.speed = 0
  }
  update = ()=>{
    this.x += this.speed
  }
}

const world = new World()
const FPS = 60

function tick(){
  world.update()
  window.setTimeout(tick, 1000/FPS)
}

tick()

export default world
