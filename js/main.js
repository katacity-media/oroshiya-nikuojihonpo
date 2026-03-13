gsap.registerPlugin(ScrollTrigger)

/* LENIS smooth scroll */

const lenis = new Lenis()

function raf(time) {

lenis.raf(time)
requestAnimationFrame(raf)

}

requestAnimationFrame(raf)


/* split text */

function splitText(selector){

document.querySelectorAll(selector).forEach(el=>{

const text = el.innerText

el.innerHTML=""

text.split("").forEach(letter=>{

const span=document.createElement("span")

span.textContent=letter

el.appendChild(span)

})

})

}

splitText(".split")


/* text animation */

gsap.utils.toArray(".split").forEach(el=>{

gsap.to(el.querySelectorAll("span"),{

y:0,
opacity:1,

stagger:0.05,

duration:1,

scrollTrigger:{

trigger:el,
start:"top 80%"

}

})

})


/* fade sections */

gsap.utils.toArray(".section").forEach(section=>{

gsap.from(section,{

opacity:0,
y:100,

duration:1.2,

scrollTrigger:{

trigger:section,
start:"top 85%"

}

})

})


/* parallax images */

gsap.utils.toArray(".parallax").forEach(el=>{

gsap.to(el,{

y:-100,

scrollTrigger:{

trigger:el,
scrub:true

}

})

})


/* hero animation */

gsap.from(".hero-inner",{

opacity:0,
y:80,
duration:1.5

})
