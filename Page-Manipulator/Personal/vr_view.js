// V10.10.2026
// Active Websites: All

document.documentElement.style.overflow = 'hidden';
document.documentElement.style.background = '#0b0b0b';

const stage = document.createElement('div');
stage.id = 'curved-tv-stage';
stage.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    perspective: 1200px;
    perspective-origin: center center;
    overflow: hidden;
    /*display: flex;*/
    justify-content: center;
    align-items: center;
`;

const cylinder = document.createElement('div');
cylinder.style.cssText = `
    position: relative;
    /*width: 200vw;*/
    height: 100vh;
    transform-style: preserve-3d;
    transition: transform 0.1s ease-out;
`;

const contentWrapper = document.createElement('div');
contentWrapper.style.cssText = `
    /*width: 200vw;*/
    height: 100vh;
    display: flex;
    background: white;
`;
while (document.body.firstChild) {
    contentWrapper.appendChild(document.body.firstChild);
}

// Slice configuration & synchronization array
const sliceCount = 1; 
const sliceWidth = 100 / sliceCount; 
const radius = 600; 
const slices = [];

for (let i = 0; i < sliceCount; i++) {
    const slice = document.createElement('div');
    slice.style.cssText = `
        position: absolute;
        top: 0;
        left: ${i * sliceWidth}vw;
        width: ${sliceWidth}vw;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        transform-style: preserve-3d;
        scrollbar-width: none;
    `;
    slice.style.cssText += `&::-webkit-scrollbar { display: none; }`;

    const inner = contentWrapper.cloneNode(true);
    inner.style.transform = `translateX(-${i * sliceWidth}vw)`;
    inner.style.position = 'relative';
    // inner.style.width = '200vw';
    inner.style.height = '100%';

    const angle = ((i - sliceCount / 2 + 0.5) / sliceCount) * 45; 
    // TODO: what is this
    // slice.style.transform = `rotateY(${angle}deg) translateZ(${radius - Math.cos((angle * Math.PI) / 180) * radius}px)`;

    slice.appendChild(inner);
    cylinder.appendChild(slice);
    slices.push(slice);
}

stage.appendChild(cylinder);
document.body.appendChild(stage);

// Mouse rotates screen
window.addEventListener('mousemove', (e) => {
    const mouseNormX = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
    const targetRotation = mouseNormX * 25; // Flipped sign so moving left rotates clockwise
    cylinder.style.transform = `rotateY(${targetRotation}deg)`;
});

window.addEventListener('wheel', (event) => {
  event.preventDefault();
  slices.forEach(s => {
      s.scrollBy({
        top: event.deltaY,
        left: 0,
        behavior: 'auto' // Use 'auto' for instant response; 'smooth' will cause input lag
      });
  })
}, { passive: false }); // 'passive: false' is mandatory to allow preventDefault()
