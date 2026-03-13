gsap.registerPlugin(ScrollTrigger)



/* loader */

window.addEventListener("load",()=>{

gsap.to("#loader",{

opacity:0,
duration:1,
delay:1,

onComplete:()=>{

document.getElementById("loader").style.display="none"

}

})

})



/* smooth scroll */

const lenis = new Lenis()

function raf(time){

lenis.raf(time)

requestAnimationFrame(raf)

}

requestAnimationFrame(raf)



/* split text */

const split = new SplitType(".split",{types:"chars"})



gsap.from(".char",{

opacity:0,
y:60,
stagger:0.04,
duration:0.8

})



/* hero parallax */

gsap.to(".hero-image",{

scrollTrigger:{

trigger:".hero",
scrub:true

},

y:-200

})



/* section fade */

gsap.utils.toArray("section").forEach(section=>{

gsap.from(section,{

scrollTrigger:{
trigger:section,
start:"top 80%"
},

opacity:0,
y:80,
duration:1

})

})



/* card animation */

gsap.from(".card",{

scrollTrigger:{
trigger:".cards",
start:"top 80%"
},

y:100,
opacity:0,
stagger:0.2

})
