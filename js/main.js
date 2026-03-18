gsap.registerPlugin(ScrollTrigger)

/* ================= Lenis ================= */

const lenis = new Lenis({
  duration: 1.2,
  smooth: true
})

function raf(time){
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

lenis.on("scroll", ScrollTrigger.update)

ScrollTrigger.scrollerProxy(document.body,{
  scrollTop(value){
    if(arguments.length){
      lenis.scrollTo(value)
    }
    return window.scrollY
  },
  getBoundingClientRect(){
    return {
      top:0,
      left:0,
      width:window.innerWidth,
      height:window.innerHeight
    }
  }
})


// これだけ残す
ScrollTrigger.refresh()

/* ================= 初期位置 ================= */

gsap.set(".loader-character",{
  x: window.innerWidth + 500,
  opacity:1
})

/* ================= DOM読み込み後 ================= */

window.addEventListener("DOMContentLoaded",()=>{

  /* ===== loader ===== */

  const tl = gsap.timeline()

  tl.to(".loader-character",{
    x: window.innerWidth * 0.4,
    duration:2.0,
    ease:"power1.inOut"
  })
  .to(".loader-character",{
    x:-600,
    duration:2.6,
    ease:"power1.in"
  })
  .to("#loader",{
    opacity:0,
    duration:0.8,
    onComplete:()=>{
      document.getElementById("loader").style.display="none"
    }
  })

  /* ===== text ===== */

  new SplitType(".split",{types:"chars"})

  gsap.from(".char",{
    y:60,
    opacity:0,
    stagger:0.04,
    duration:0.8,
    ease:"power2.out"
  })

  /* ===== hero 初期 ===== */

  gsap.set(".hero-bg",{opacity:0, scale:1.2})
  gsap.set(".hero-year",{opacity:0, scale:0.8})
  gsap.set(".hero-tag",{opacity:0, y:40})

  /* ===== hero 登場 ===== */

  tl.to(".hero-bg",{
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

  /* ================= scroll系 ================= */

  gsap.to(".hero-bg",{
    scrollTrigger:{
      trigger:".hero",
      start:"top top",
      end:"bottom top",
      scrub:true
    },
    y:-200
  })

  gsap.to(".hero-middle",{
    scrollTrigger:{
      trigger:".hero",
      start:"top top",
      end:"bottom top",
      scrub:true
    },
    y:-150
  })

  gsap.from(".card",{
    scrollTrigger:{
      trigger:".cards",
      start:"top 80%"
    },
    opacity:0,
    y:80,
    stagger:0.2,
    duration:1,
    ease:"power2.out"
  })

  ScrollTrigger.refresh()

})

/* ================= lightbox ================= */

const stickers = document.querySelectorAll(".sticker")
const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightbox-img")

stickers.forEach(sticker=>{
  sticker.addEventListener("click",()=>{

    lightboxImg.src = sticker.src
    lightbox.classList.add("active")

    gsap.fromTo(lightboxImg,
      {scale:0.8, opacity:0},
      {scale:1, opacity:1, duration:0.5}
    )

  })
})

lightbox.addEventListener("click",()=>{

  gsap.to(lightboxImg,{
    scale:0.8,
    opacity:0,
    duration:0.3,
    onComplete:()=>{
      lightbox.classList.remove("active")
    }
  })

})
