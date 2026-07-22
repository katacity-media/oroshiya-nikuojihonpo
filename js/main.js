gsap.registerPlugin(ScrollTrigger)

/* ================= Lenis ================= */
// v1系はオプション名が変更されているため修正(smooth→自動、smoothWheelがデフォルトtrue)
const lenis = new Lenis({
  duration: 1.2
})
lenis.on("scroll", ScrollTrigger.update)

// 完全同期
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

/* ================= ローダー安全装置 =================
   CDN読み込み失敗などでアニメが動かない場合に備え、
   一定時間経過で強制的にローダーを消す */
const loaderFailSafe = setTimeout(()=>{
  const loaderEl = document.getElementById("loader")
  if(loaderEl){
    loaderEl.style.display = "none"
  }
}, 6000)

/* ================= 初期位置 ================= */
gsap.set(".loader-character",{
  x: window.innerWidth + 500,
  opacity:1
})

/* ================= DOM読み込み後 ================= */
window.addEventListener("DOMContentLoaded",()=>{

  const isMobile = window.innerWidth <= 768
  const loaderStep1 = isMobile ? 1.1 : 2.2
  const loaderStep2 = isMobile ? 1.4 : 2.8

  const tl = gsap.timeline({
    onComplete:()=>{
      clearTimeout(loaderFailSafe)
    }
  })

  /* ===== loader ===== */
  tl.to(".loader-character",{
    x: window.innerWidth * 0.4,
    duration: loaderStep1,
    ease:"power1.inOut"
  })
  .to(".loader-character",{
    x:-600,
    duration: loaderStep2,
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
  gsap.set(".hero-bg",{opacity:0, scale:1})
  gsap.set(".hero-year",{opacity:0, scale:0.8})
  gsap.set(".hero-tag",{opacity:0, y:40})

  /* ===== hero 登場 ===== */
  tl.to(".hero-bg",{
    opacity:1,
    scale:1,
    duration:1.6,
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
      scrub:1
    },
    scale:1.08,
    y:-120
  })

  gsap.to(".hero-middle",{
    scrollTrigger:{
      trigger:".hero",
      start:"top top",
      end:"bottom top",
      scrub:1
    },
    y:-120
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

/* ================= ヘッダー:スクロールで背景を付ける ================= */
const headerEl = document.querySelector(".header")
window.addEventListener("scroll",()=>{
  if(window.scrollY > 60){
    headerEl.classList.add("scrolled")
  }else{
    headerEl.classList.remove("scrolled")
  }
})

/* ================= ハンバーガーメニュー ================= */
const menuBtn = document.getElementById("menuBtn")
const nav = document.getElementById("nav")

menuBtn.addEventListener("click",()=>{
  menuBtn.classList.toggle("active")
  nav.classList.toggle("open")
})

// メニュー内リンクを押したら自動で閉じる
nav.querySelectorAll("a").forEach(link=>{
  link.addEventListener("click",()=>{
    menuBtn.classList.remove("active")
    nav.classList.remove("open")
  })
})

/* ================= lightbox ================= */
const stickers = document.querySelectorAll(".sticker")
const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightbox-img")
const lightboxClose = document.getElementById("lightbox-close")

function openLightbox(src){
  lightboxImg.src = src
  lightbox.classList.add("active")
  gsap.fromTo(lightboxImg,
    {scale:0.8, opacity:0},
    {scale:1, opacity:1, duration:0.5}
  )
}

function closeLightbox(){
  gsap.to(lightboxImg,{
    scale:0.8,
    opacity:0,
    duration:0.3,
    onComplete:()=>{
      lightbox.classList.remove("active")
    }
  })
}

stickers.forEach(sticker=>{
  sticker.addEventListener("click",()=>{
    openLightbox(sticker.src)
  })
})

// 背景クリックで閉じる(ただし画像自体のクリックは除外)
lightbox.addEventListener("click",(e)=>{
  if(e.target === lightbox){
    closeLightbox()
  }
})

// ✕ボタンで閉じる
lightboxClose.addEventListener("click", closeLightbox)

// Escキーで閉じる(スマホ以外でも便利)
window.addEventListener("keydown",(e)=>{
  if(e.key === "Escape" && lightbox.classList.contains("active")){
    closeLightbox()
  }
})
