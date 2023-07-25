
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import '../public/css/draft_1_0.css';

import One from './demo-1'

new One();

// gsap.registerPlugin(ScrollTrigger);

const homeBack = document.querySelector('.home-back');
const homeOuter = document.querySelector('.home-outer');
const homeInner = document.querySelector('.home-wrap');

window.addEventListener('scroll', ()=>{
  if(window.scrollY > 100){
    homeBack.style.opacity = 0.9;
  }else if(window.scrollY < 100){
    homeBack.style.opacity = 1;
  }
  // console.log(homeInner.offsetTop);
  console.log(window.scrollY);
}, false);
  

//---------------------------

async function typeEffect () {

  const node = document.querySelector(".input-tag");
  
  await sleep(1000)
  node.innerText = ""
  await node.type('# ')
  
  while (true) {
    await node.type('Story Seller')
    await sleep(2000)
    await node.delete('Story Seller')
    await node.type('Value Teller')
    await sleep(2000)
    await node.delete('Value Teller')
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

// typeEffect();

//---------------------------
// window.addEventListener('load', ()=>{

// });

// const homeWrap = document.querySelector('.home-outer');




