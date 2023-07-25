import gsap from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';

import '../public/css/draft_2_0.css';

// Vars -----

const gridOuter = document.querySelector('.home-wrap');
const gridWrap = document.querySelectorAll('.grid-wrap');

let gridHeight = gridWrap[0].clientHeight;
let gridOuterHeight = gridWrap.length*gridHeight;
console.log(gridHeight);
console.log(gridWrap.length);

let scrollSpeed = 0
let oldScrollY = 0
let scrollY = 0
let y = 0


// Lerp -----
const lerp = (v0, v1, t) => {
  return v0 * ( 1 - t ) + v1 * t
}

const dispose = (scroll) => {
  gsap.set(gridWrap, {
    y: (i) => {
      return i * gridHeight + scroll
    },
    modifiers: {
      y: (y) => {
        const s = gsap.utils.wrap(-gridHeight, gridOuterHeight - gridHeight, parseInt(y))
        return `${s}px`
      }
    }
  })
} 
 dispose(0);

// Wheel -----
const handleMouseWheel = (e) => {
  scrollY -= e.deltaY  
}

// Touch -----
let touchStart = 0
let touchY = 0
let isDragging = false
const handleTouchStart = (e) => {
  touchStart = e.clientY || e.touches[0].clientY
  isDragging = true
  gridOuter.classList.add('is-dragging')
}
const handleTouchMove = (e) => {
  if (!isDragging) return
  touchY = e.clientY || e.touches[0].clientY
  scrollY += (touchY - touchStart) * 2.5
  touchStart = touchY
}
const handleTouchEnd = () => {
  isDragging = false
  gridOuter.classList.remove('is-dragging')
}


// Listener -----
gridOuter.addEventListener('mousewheel', handleMouseWheel)

gridOuter.addEventListener('touchstart', handleTouchStart)
gridOuter.addEventListener('touchmove', handleTouchMove)
gridOuter.addEventListener('touchend', handleTouchEnd)

gridOuter.addEventListener('mousedown', handleTouchStart)
gridOuter.addEventListener('mousemove', handleTouchMove)
gridOuter.addEventListener('mouseleave', handleTouchEnd)
gridOuter.addEventListener('mouseup', handleTouchEnd)

gridOuter.addEventListener('selectstart', () => { return false })


// Resize -----
window.addEventListener('resize', () => {
  gridHeight = gridWrap[0].clientHeight;
  gridOuterHeight = gridWrap.length*gridHeight;
})

// Render -----
const render = () => {
  requestAnimationFrame(render)
  y = lerp(y, scrollY, .1)
  dispose(y)
  
  scrollSpeed = y - oldScrollY
  oldScrollY = y

}
render();

/*---------------------*/
/*---------------------*/

async function typeEffect () {

  const node = document.querySelector(".input-tag");
  
  await sleep(1000)
  node.innerText = ""
  // await node.type('# ')
  
  while (true) {
    await node.type('당신의 고민을 들려주세요')
    await sleep(2000)
    await node.delete('당신의 고민을 들려주세요')
    await node.type('당신의 고민을 들려주세요')
    await sleep(2000)
    await node.delete('당신의 고민을 들려주세요')
    // await node.type('Value Teller')
    // await sleep(2000)
    // await node.delete('Value Teller')
  }
}

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

class TypeAsync extends HTMLSpanElement {
  get typeInterval () {
    const randomMs = 100 * Math.random()
    return randomMs < 50 ? 10 : randomMs
  }
  
  async type (text) {
    for (let character of text) {
      this.innerText += character
      await sleep(this.typeInterval)
    }
  }
  
  async delete (text) {
    for (let character of text) {
      this.innerText = this.innerText.slice(0, this.innerText.length -1)
      await sleep(this.typeInterval)
    }
  }
}

customElements.define('type-async', TypeAsync, { extends: 'span' });

typeEffect();
