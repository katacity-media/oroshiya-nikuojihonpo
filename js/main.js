gsap.registerPlugin(ScrollTrigger)

/* smooth scroll */

const lenis = new Lenis()

function raf(time){

lenis.raf(time)
requestAnimationFrame(raf)

}

requestAnimationFrame(raf)



/* text split */

new SplitType(".split",{types:"chars"})

gsap.from(".char",{

y:60,
opacity:0,
stagger:0.04,
duration:0.8

})



gsap.to(".hero-bg",{

scrollTrigger:{
trigger:".hero",
start:"top top",
end:"bottom top",
scrub:true
},

scale:1.35,
y:-200

})


/* hero parallax layer */

gsap.to(".hero-middle",{

scrollTrigger:{
trigger:".hero",
scrub:true
},

y:-150

})



/* parallax section */

gsap.to(".parallax-img",{

scrollTrigger:{
trigger:".parallax",
scrub:true
},

y:-250

})



/* cards animation */

gsap.from(".card",{

scrollTrigger:{
trigger:".cards",
start:"top 80%"
},

opacity:0,
y:80,
stagger:0.2

})

/* loader */
window.addEventListener("load",()=>{

gsap.to("#loader",{
opacity:0,
duration:0.8,
delay:0.6,

onComplete:()=>{
document.getElementById("loader").style.display="none"
}
})

const tl = gsap.timeline({delay:0.5})

tl.to(".hero-img",{
opacity:1,
scale:1,
duration:1.8,
ease:"power2.out"
})

.to(".hero-year",{
opacity:1,
scale:1,
duration:1.2,
ease:"power3.out"
},"-=1")

.to(".hero-tag",{
opacity:1,
y:0,
duration:1,
ease:"power2.out"
},"-=0.6")

})
