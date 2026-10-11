// V10.11.2026
// Active Websites: All

const horizontalScale = 3;

// 1. Create the box element
const box = document.createElement('div');
box.id = 'cursor-hi-box';
box.textContent = '';
box.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    padding: 8px 16px;
    background: #ffffff;
    color: #000000;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-family: sans-serif;
    font-weight: bold;
    font-size: 14px;
    pointer-events: none;
    z-index: 999999;
    transform: translate(15px, 15px);
`;

// Append to document.documentElement so it escapes the body's transform space!
document.documentElement.appendChild(box);

// 2. Mouse move handler for both panning and cursor tracking
window.addEventListener('mousemove', (e) => {
    box.style.left = `${e.clientX}px`;
    box.style.top = `${e.clientY}px`;
});

let smoothness = 1;
let modSmoothness = false;
let boxTimeout;

// Clear any old transforms
document.body.style.transform = 'none';
document.body.style.transition = `transform ${smoothness}s cubic-bezier(0.1, 0.9, 0.2, 1)`;

window.addEventListener('mousemove', (e) => {
    if (smoothness !== -1) {
        // const maxXScrollOffset = window.innerWidth;
        // const mouseNormX = (e.clientX / maxXScrollOffset) * 2 - 1;
        // const targetX = mouseNormX * (-maxXScrollOffset / 2);
        
        // const maxYScrollOffset = window.innerHeight;
        // const mouseNormY = (e.clientY / maxYScrollOffset) * 2 - 1;
        // const targetY = mouseNormY * (-maxYScrollOffset / 2);
        
        // document.body.style.transform = `translateX(${targetX}px) translateY(${targetY}px)`;
        
    // 1. Force the document and body to be extra wide instead of scaling/stretching
    document.documentElement.style.width = `${horizontalScale * 100}vw`;
    document.body.style.width = `${horizontalScale * 100}vw`;
    // document.body.style.transformOrigin = 'top left';
        
        // 1. Get normalized mouse position from -1 (left edge) to 1 (right edge)
        const mouseNormX = (e.clientX / window.innerWidth) * 2 - 1; 
        
        // 2. Calculate max offset scaled by horizontalScale
        const maxScrollOffset = horizontalScale * window.innerWidth; 
        
        // 3. Compute targetX centered symmetrically in the [-scaleX, scaleX] range
        const targetX = mouseNormX * (-maxScrollOffset / 2); 
        
        document.body.style.transform = `translateX(${targetX}px)`;
        window.scrollTo((document.documentElement.scrollWidth - window.innerWidth) / 2, window.scrollY);
    }
});

window.addEventListener('wheel', (e) => {
    if (modSmoothness) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (e.deltaY < 0) smoothness = Math.min(5, smoothness + 1);
        else smoothness = Math.max(-1, smoothness - 1);

        const feedback = smoothness === -1 ? " (Off)" : smoothness === 0 ? " (Lagless)" : smoothness === 1 ? " (Default)" : smoothness === 3 ? " (Smooth)" : smoothness === 1 ? " (Default)" : smoothness === 5 ? " (Slow)" : ""
        if (smoothness !== -1) {
            document.body.style.transition = `transform ${smoothness}s cubic-bezier(0.1, 0.9, 0.2, 1)`;
        } else {
            document.body.style.transform = 'none';
            document.body.style.transition = "";
        }
        clearTimeout(boxTimeout);
        box.textContent = `Smoothness: ${smoothness} seconds${feedback}`;
        box.style.display = "";
        boxTimeout = setTimeout(() => {box.style.display = "none";}, 1000);
    }
}, {passive: false, capture: true});

window.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.altKey) modSmoothness = true;
}, true);

window.addEventListener('keyup', (e) => {
    if (e.shiftKey || e.altKey) modSmoothness = false;
}, true);

box.textContent = "Alt + Shift + Scroll Wheel to Increase/Decrease Smoothness";
boxTimeout = setTimeout(() => {box.style.display = "none";}, 5000);
