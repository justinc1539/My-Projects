// V10.10.2026
// Active Websites: All
const HORIZONTAL_SCALE = 1;
let smoothness = 0;
let modSmoothness = false;
document.body.style.transformOrigin = 'top left';
document.body.style.transform = `scaleX(${HORIZONTAL_SCALE})`;

document.body.style.transition = `transform 0s cubic-bezier(0.1, 0.9, 0.2, 1)`;

window.addEventListener('mousemove', (e) => {
    const mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
    const maxScrollOffset = HORIZONTAL_SCALE*window.innerWidth; // How far it slides
    const targetX = mouseNormX * (-maxScrollOffset / 2); 
    
    // TODO: Fix translateX equation for various HORIZONTAL_SCALE
    // document.body.style.transform = `translateX(-${HORIZONTAL_SCALE * 100 * e.clientX / (window.innerWidth - 2)}%) scaleX(${HORIZONTAL_SCALE})`;
    document.body.style.transform = `translateX(${targetX}px) scaleX(${HORIZONTAL_SCALE})`;
    // document.body.style.transform = `translateX(${-0.892*HORIZONTAL_SCALE*window.innerWidth}px) scaleX(${HORIZONTAL_SCALE})`;
});

window.addEventListener('wheel', (e) => {
    if (modSmoothness) {
        event.preventDefault();
        event.stopPropagation();
        if (e.deltaY < 0) smoothness++;
        else smoothness = Math.max(0, smoothness - 1);
        document.body.style.transition = `transform ${smoothness}s cubic-bezier(0.1, 0.9, 0.2, 1)`;
        console.log(smoothness);
    }
});

window.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.altKey) modSmoothness = true;
});

window.addEventListener('keyup', (e) => {
    if (e.shiftKey || e.altKey) modSmoothness = false;
});
