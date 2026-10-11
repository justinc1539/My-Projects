// V10.11.2026
// Active Websites: All

const scale = 3; // Change to whatever you like!

// 1. Force the document and body to be extra large instead of scaling/stretching
document.documentElement.style.width = `${scale * 100}vw`;
document.body.style.width = `${scale * 100}vw`;
document.documentElement.style.height = `${scale * 100}vw`;
document.body.style.height = `${scale * 100}vw`;

window.addEventListener('mousemove', (e) => {
    // console.log(e.clientX / window.innerWidth)
    // window.scrollTo(e.clientX / window.innerWidth / 1.5 * document.documentElement.scrollWidth)
    
    window.scrollTo({
      top: (2 * scale * e.clientY / window.innerHeight - 1 * scale) * document.documentElement.scrollHeight,
      left: (2 * scale * e.clientX / window.innerWidth - 1 * scale) * document.documentElement.scrollWidth,
      behavior: 'instant' // 'smooth', 'instant', or 'auto'
    });

});
