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

    // Listen for key presses
    window.addEventListener('keydown', (e) => {
        // // Skip pure modifier keys to keep it clean
        // if (["Control", "Alt", "Shift", "Meta"].includes(e.key)) return;

        // 1. Create the floating key element
        const el = document.createElement('div');
        el.textContent = e.key === " " ? "Space" : e.key;
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
        `;
        document.documentElement.appendChild(el);

        // 2. Set up initial physics variables at cursor coordinates
        let x = mouseX;
        let y = mouseY;
        let vx = -7;       // Constant speed moving left
        let vy = -9;       // Initial upward velocity (negative values move up on screen)
        const gravity = 0.5; // Acceleration pulling it down every frame

        // 3. Animation loop using requestAnimationFrame
        function animate() {
            vy += gravity; // Apply gravity acceleration to vertical velocity
            x += vx;       // Move horizontally (left)
            y += vy;       // Move vertically (up then down)

            el.style.transform = `translate(${x}px, ${y}px)`;

            // Clean up elements once they fall off the screen boundaries
            if (y > window.innerHeight + 100 || x < -100) {
                el.remove();
            } else {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    });
})();
