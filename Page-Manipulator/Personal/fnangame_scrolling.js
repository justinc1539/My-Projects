// V10.19.2026
// Active Websites: All

let smoothness = 1;
let scale = 1;

// 1. Force the document and body to be extra wide instead of scaling/stretching
document.documentElement.style.width = `${scale * 100}vw`;
document.body.style.width = `${scale * 100}vw`;

// 1. Create the box element
const box = document.createElement('div');
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

let modSmoothness = false;
let modScale = false;
let boxTimeout;
let clientX = window.innerWidth * 0.5;
let clientY = window.innerHeight * 0.5;

setInterval(() => {
    const width = window.innerWeidth;
    if (clientX < width * 0.1) {
        window.scrollTo({
            top: window.scrollY,
            left: window.scrollX - 20 * ((0.1 * width - clientX)/(0.1 * width)),
            behavior: 'instant'
        });
    } else if (clientX > width * 0.9) {
        window.scrollTo({
            top: window.scrollY,
            left: window.scrollX + 20 * (1 - (width - clientX) / 100),
            behavior: 'instant'
        });
    }

    const height = window.innerHeight;
    if (clientY < height * 0.1) {
        window.scrollTo({
            top: window.scrollY - 20 * ((0.1 * height - clientY)/(0.1 * height)),
            left: window.scrollX,
            behavior: 'instant'
        });
    } else if (clientY > height * 0.9) {
        window.scrollTo({
            top: window.scrollY + 20 * (1 - (height - clientY) / 100),
            left: window.scrollX,
            behavior: 'instant'
        });
    }
}, 10);

// Clear any old transforms
document.body.style.transform = 'none';
document.body.style.transition = `transform ${smoothness}s cubic-bezier(0.1, 0.9, 0.2, 1)`;

window.addEventListener('mousemove', (e) => {
    clientX = e.clientX;
    clientY = e.clientY;

    box.style.left = `${clientX}px`;
    box.style.top = `${e.clientY}px`;

    if (smoothness !== -1) {
        // 1. Get normalized mouse position from -1 (left edge) to 1 (right edge)
        const mouseNormX = (clientX / window.innerWidth) * 2 - 1; 
        
        // 2. Calculate max offset scaled by scale
        const maxXScrollOffset = Math.round(scale) * window.innerWidth; 
        
        // 3. Compute targetX centered symmetrically in the [-scaleX, scaleX] range
        const targetX = mouseNormX * (-maxXScrollOffset / 2); 
        
        // 1. Get normalized mouse position from -1 (left edge) to 1 (right edge)
        const mouseNormY = (e.clientY / window.innerWidth) * 2 - 0.5;
        
        // 2. Calculate max offset scaled by scale
        const maxYScrollOffset = Math.round(scale) * window.innerWidth; 
        
        // 3. Compute targetY centered symmetrically in the [-scaleY, scaleY] range
        const targetY = mouseNormY * (-maxYScrollOffset / 2); 
        
        // TODO: Checkup
        document.body.style.transform = `translateX(${targetX}px) translateY(${targetY}px)`;
        // document.body.style.transform = `translateY(${targetY}px)`;

        // 1. Get mouse position as a ratio from 0 to 1
        const mouseRatio = clientX / window.innerWidth;
        
        // 2. Calculate distance from the center (0.5)
        let distanceFromCenter = mouseRatio - 0.5; // Ranges from -0.5 (left) to 0.5 (right)
        
        // 3. Multiply sensitivity so reaching 25% from center (0.25 or 0.75) hits max scroll
        // A factor of 4 means 0.25 * 4 = 1.0 (full limit)
        let scaled = distanceFromCenter * 8;
        
        // 4. Clamp the value between -1 and 1 so it stops cleanly at the edges
        scaled = Math.max(-1, Math.min(1, scaled));
        
        // 5. Map the -1 to 1 range across the actual scrollable width (centered)
        const maxScrollLeft = document.documentElement.scrollWidth - window.innerWidth;
        const targetScrollLeft = ((scaled + 1) / 2) * maxScrollLeft;

        if (smoothness === 0) {
            // window.scrollTo({
            //     top: window.scrollY,
            //     left: targetScrollLeft,
            //     behavior: 'instant'
            // });
        }
    }
});

document.addEventListener('mouseleave', (event) => {
    if (clientX < window.innerWidth * 0.1) {
        clientX = 0;
        // box.style.left = `${clientX}px`;
        // window.scrollTo({
        //     top: window.scrollY,
        //     left: clientX,
        //     behavior: 'instant'
        // });
    } else if (clientX > window.innerWidth * 0.9) {
        clientX = window.innerWidth;
        // box.style.left = `${clientX}px`;
        // window.scrollTo({
        //     top: window.scrollY,
        //     left: clientX,
        //     behavior: 'instant'
        // });
    }
    if (clientY < window.innerHeight * 0.1) {
        clientY = 0;
    } else if (clientY > window.innerHeight * 0.9) {
        clientY = window.innerHeight;
    }
});

window.addEventListener('wheel', (e) => {
    // console.log(`${window.scrollX}, ${window.scrollY}`)
    if (modSmoothness) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (e.deltaY < 0) smoothness = Math.min(5, smoothness - e.deltaY / 100);
        else smoothness = Math.max(-1, smoothness - e.deltaY / 100);
        const roundedSmoothness = Math.round(smoothness)

        const feedback = roundedSmoothness === -1 ? " (Off)" : roundedSmoothness === 0 ? " (Lagless)" : roundedSmoothness === 1 ? " (Default)" : roundedSmoothness === 3 ? " (Smooth)" : roundedSmoothness === 1 ? " (Default)" : roundedSmoothness === 5 ? " (Slow)" : "";
        if (roundedSmoothness !== -1) {
            document.body.style.transition = `transform ${roundedSmoothness}s cubic-bezier(0.1, 0.9, 0.2, 1)`;
        } else {
            document.body.style.transform = 'none';
            document.body.style.transition = "";
        }

        clearTimeout(boxTimeout);
        box.textContent = `Smoothness: ${roundedSmoothness} seconds${feedback}`;
        box.style.display = "";
        boxTimeout = setTimeout(() => {box.style.display = "none";}, 1000);
    } else if (modScale) {
        alert(67)
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (e.deltaY < 0) scale -= e.deltaY / 100;
        else scale = Math.max(1, scale - e.deltaY / 100);
        const roundedScale = Math.round(scale)

        const feedback = roundedScale === 1 ? " (Default)" : "";
        document.documentElement.style.width = `${roundedScale * 100}vw`;
        document.body.style.width = `${roundedScale * 100}vw`;

        clearTimeout(boxTimeout);
        box.textContent = `Scale: ${roundedScale}x${feedback}`;
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
            // alert(modScale)
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
