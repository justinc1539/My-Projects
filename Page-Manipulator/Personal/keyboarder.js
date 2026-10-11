// V10.10.2026
// Active Websites: All

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
    display: none;
    transform: translate(15px, 15px);
`;

// Append to document.documentElement so it escapes the body's transform space!
document.documentElement.appendChild(box);

// 2. Mouse move handler for both panning and cursor tracking
window.addEventListener('mousemove', (e) => {
    box.style.left = `${e.clientX}px`;
    box.style.top = `${e.clientY}px`;
});

let text = "";
window.addEventListener('keydown', (e) => {
    if (!["Control", "Alt", "Shift", "Meta"].includes(e.key)) {
        if (["Enter", "Space"].includes(box.textContent)) box.textContent = "";
        if (e.key === "Backspace") box.textContent = box.textContent.slice(0, box.textContent.length - text.length)
        else {
            text = e.key;
            if (e.ctrlKey) text = "Ctrl + " + text;
            if (e.altKey) text = "Alt + " + text;
            // if (e.shiftKey) text = "Shift + " + text;
            if (e.metaKey) text = "Meta + " + text;

            if (e.key === "Enter") box.textContent = e.key;
            // else if (e.key === " ") box.textContent = "Space";
            else box.textContent += text;
        }
        
        box.style.display = box.textContent.length > 0 ? "" : "none";
    }
}, true);
