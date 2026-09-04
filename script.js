(function(){
  "use strict";

  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((link)=>{
    if(link.getAttribute("href") === path){
      link.setAttribute("aria-current","page");
    }
  });

  const tiles = Array.from(document.querySelectorAll(".gallery-tile"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  const close = document.getElementById("lightbox-close");

  if(!tiles.length || !lightbox || !lightboxImg || !caption || !close) return;

  let current = 0;

  function show(index){
    current = index;
    const img = tiles[current].querySelector("img");
    const label = tiles[current].querySelector(".gallery-label");

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    caption.textContent = label ? label.textContent : img.alt;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
    close.focus();
  }

  function hide(){
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
  }

  tiles.forEach((tile,index)=>{
    tile.addEventListener("click",()=>show(index));
  });

  close.addEventListener("click",hide);
  lightbox.addEventListener("click",(event)=>{
    if(event.target === lightbox) hide();
  });

  document.addEventListener("keydown",(event)=>{
    if(!lightbox.classList.contains("active")) return;
    if(event.key === "Escape") hide();
    if(event.key === "ArrowRight") show((current + 1) % tiles.length);
    if(event.key === "ArrowLeft") show((current - 1 + tiles.length) % tiles.length);
  });
})();
