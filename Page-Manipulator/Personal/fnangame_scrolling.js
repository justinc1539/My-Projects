// V10.11.2026
// Active Websites: All

let scale = 1;

// 1. Force the document and body to be extra wide instead of scaling/stretching
document.documentElement.style.width = `${scale * 100}vw`;
document.body.style.width = `${scale * 100}vw`;

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
let modScale = false;
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
        
        // 1. Get normalized mouse position from -1 (left edge) to 1 (right edge)
        const mouseNormX = (e.clientX / window.innerWidth) * 2 - 1; 
        
        // 2. Calculate max offset scaled by scale
        const maxXScrollOffset = scale * window.innerWidth; 
        
        // 3. Compute targetX centered symmetrically in the [-scaleX, scaleX] range
        const targetX = mouseNormX * (-maxXScrollOffset / 2); 
        
        // 1. Get normalized mouse position from -1 (left edge) to 1 (right edge)
        const mouseNormY = (e.clientY / window.innerWidth) * 2 - 1; 
        
        // 2. Calculate max offset scaled by scale
        const maxYScrollOffset = scale * window.innerWidth; 
        
        // 3. Compute targetY centered symmetrically in the [-scaleY, scaleY] range
        const targetY = mouseNormY * (-maxYScrollOffset / 2); 
        
        document.body.style.transform = `translateX(${targetX}px) translateY(${targetY}px)`;
        window.scrollTo((document.documentElement.scrollWidth - window.innerWidth) / 2, window.scrollY);
        console.log(`${window.scrollX}, ${window.scrollY}`)
    }
});

window.addEventListener('wheel', (e) => {
    if (modSmoothness) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (e.deltaY < 0) smoothness = Math.min(5, smoothness + 1);
        else smoothness = Math.max(-1, smoothness - 1);

        const feedback = smoothness === -1 ? " (Off)" : smoothness === 0 ? " (Lagless)" : smoothness === 1 ? " (Default)" : smoothness === 3 ? " (Smooth)" : smoothness === 1 ? " (Default)" : smoothness === 5 ? " (Slow)" : "";
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
    } else if (modScale) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        console.log(`old: ${scale}`)
        if (e.deltaY < 0) scale++;
        else scale = Math.max(0, scale - 1);
        console.log(`new: ${scale}`)

        const feedback = scale === 0 ? " (Off)" : "";
        if (scale !== 0) {
            document.documentElement.style.width = `${scale * 100}vw`;
            document.body.style.width = `${scale * 100}vw`;
        } else {
            document.documentElement.style.width = "";
            document.body.style.width = "";
        }

        clearTimeout(boxTimeout);
        box.textContent = `Scale: ${scale}x${feedback}`;
        box.style.display = "";
        boxTimeout = setTimeout(() => {box.style.display = "none";}, 1000);
    }
}, {passive: false, capture: true});

window.addEventListener('keydown', (e) => {
    if (e.altKey) {
        if (e.shiftKey) {
            modSmoothness = true;
            modScale = false;
        } else if (e.ctrlKey) {
            modSmoothness = false;
            modScale = true;
        }
    }
}, true);

window.addEventListener('keyup', (e) => {
    if (e.shiftKey) modSmoothness = false;
    if (e.ctrlKey) modScale = false;
    if (e.altKey) {
        modSmoothness = false;
        modScale = false;
    }
}, true);

box.textContent = "Alt + Shift + Scroll Wheel to Increase/Decrease Smoothness";
boxTimeout = setTimeout(() => {box.style.display = "none";}, 5000);
