gsap.registerPlugin(ScrollTrigger)

/* smooth scroll */

const lenis = new Lenis()

lenis.on("scroll", ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

/* ================= loader → 全開始 ================= */

window.addEventListener("load", () => {

  const tl = gsap.timeline()

  /* キャラ走る */
  tl.to(".loader-character", {
    x: window.innerWidth * 0.5,
    duration: 1.2
  })
  .to(".loader-character", {
    x: window.innerWidth + 300,
    duration: 1.3
  })

  /* ローダー消える */
  .to("#loader", {
    opacity: 0,
    duration: 0.8,
    onComplete: () => {
      document.getElementById("loader").style.display = "none"
    }
  })

  /* ===== ここから本編 ===== */

  /* text split（ここで発火） */
  new SplitType(".split",{types:"chars"})

  gsap.from(".char",{
    y:60,
    opacity:0,
    stagger:0.04,
    duration:0.8,
    ease:"power2.out"
  })

  /* hero 初期状態 */
  gsap.set(".hero-bg",{opacity:0, scale:1.2})
  gsap.set(".hero-year",{opacity:0, scale:0.8})
  gsap.set(".hero-tag",{opacity:0, y:40})

  /* hero 登場アニメ */
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

  /* ===== scroll系はここで発火 ===== */

  /* hero scroll zoom */
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

  /* hero parallax */
  gsap.to(".hero-middle",{
    scrollTrigger:{
      trigger:".hero",
      start:"top top",
      end:"bottom top",
      scrub:true
    },
    y:-150
  })

  /* cards */
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
