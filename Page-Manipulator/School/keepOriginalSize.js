// V11.25.2026
const width =  window.innerWidth;
const height =  window.innerHeight;
setInterval(() => {
    document.documentElement.style.width = `${width}px`;
    document.documentElement.style.height = `${height}px`;
}, 1)
