// V10.11.2026
// Active Websites: All

(function () {
    // Track the current cursor position
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const queue = [];
    const keyDelay = 0;

    // Shared key handler function
    function handleKeyDown(e) {
        if (["Control", "Alt", "Shift", "Meta"].includes(e.key)) return;

        let text = e.key === " " ? "Space" : e.key;
        let modifiers = [];
        
        if (e.ctrlKey) modifiers.push("Ctrl");
        if (e.altKey) modifiers.push("Alt");
        if (e.shiftKey) modifiers.push("Shift");
        if (e.metaKey) modifiers.push("Meta");

        if (modifiers.length > 0) {
            text = modifiers.join(" + ") + " + " + text;
        }

        queue.push({
            text: text,
            x: mouseX,
            y: mouseY
        });
    }

    // 1. Listen on the main window
    window.addEventListener('keydown', handleKeyDown);

    // 2. Attempt to listen inside the iframe (Works if same-origin)
    const iframe = document.getElementById('html5game');
    if (iframe) {
        try {
            // Wait for iframe to load if necessary, or attach directly
            const iframeWindow = iframe.contentWindow;
            if (iframeWindow) {
                iframeWindow.addEventListener('keydown', handleKeyDown);
            }
        } catch (err) {
            console.warn("Cross-origin iframe security blocks direct event monitoring from the parent page.");
        }
    }

    // Process the queue one item every keyDelay ms
    setInterval(() => {
        if (queue.length === 0) return;
        const item = queue.shift();
        spawnKey(item.text, item.x, item.y);
    }, keyDelay);

    // Physics and animation function
    function spawnKey(text, startX, startY) {
        const el = document.createElement('div');
        el.textContent = text;
        el.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            padding: 6px 10px;
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
            will-change: transform;
            white-space: nowrap;
        `;
        document.documentElement.appendChild(el);

        let x = startX;
        let y = startY;
        let vx = -7;       
        let vy = -9;       
        const gravity = 0.5; 

        function animate() {
            vy += gravity; 
            x += vx;       
            y += vy;       

            el.style.transform = `translate(${x}px, ${y}px)`;

            if (y > window.innerHeight + 100 || x < -200) {
                el.remove();
            } else {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }
})();
