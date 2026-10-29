// V10.28.2026
if (window.location.href.includes("minecraftskins.com/skin-editor")) {
    const canvas = document.getElementById('model-render');
    
    // 1. Capture the pointer the moment you press down on the canvas
    canvas.addEventListener('pointerdown', (e) => {
        try {
            canvas.setPointerCapture(e.pointerId);
            // console.log("Pointer captured successfully!");
        } catch (err) {
            console.error("Failed to capture pointer:", err);
        }
    });
    
    // 2. Track movement globally across the whole screen while held down
    canvas.addEventListener('pointermove', (e) => {
        if (canvas.hasPointerCapture(e.pointerId)) {
            // Put your custom canvas logic / coordinate handling here:
            // console.log(`Tracking outside - Screen X: ${e.screenX}, Screen Y: ${e.screenY}`);
        }
    });
    
    // 3. Release capture when you let go of the mouse button
    canvas.addEventListener('pointerup', (e) => {
        if (canvas.hasPointerCapture(e.pointerId)) {
            canvas.releasePointerCapture(e.pointerId);
        }
    });
    
    // Add keyboard shortcut texts
    document.querySelector('#colorholder_chose i').insertAdjacentHTML('beforeend', '<span style="display: block;">[p] - Pencil</span>');
    document.querySelector('#erasepixel i').insertAdjacentHTML('beforeend', '<span style="display: block;">[e] - Eraser</span>');
    document.querySelector('#autotone i').insertAdjacentHTML('beforeend', '<span style="display: block;">[a] - Auto Tone</span>');
    document.querySelector('#pickcolor i').insertAdjacentHTML('beforeend', '<span style="display: block;">[c] - Color Picker</span>');
    document.querySelector('#bucket i').insertAdjacentHTML('beforeend', '<span style="display: block;">[b] - Bucket</span>');
    document.querySelector('#undo i').insertAdjacentHTML('beforeend', '<span style="display: block;">[u] - Undo</span>');
    document.querySelector('#redo i').insertAdjacentHTML('beforeend', '<span style="display: block;">[r] - Redo</span>');
    document.querySelector('#darker i').insertAdjacentHTML('beforeend', '<span style="display: block;">[z] - Darken Color</span>');
    document.querySelector('#lighter i').insertAdjacentHTML('beforeend', '<span style="display: block;">[z] - Lighten Color</span>');
    document.querySelector('#zoom-in i').insertAdjacentHTML('beforeend', '<span style="display: block;">[q] - Zoom In</span>');
    document.querySelector('#zoom-out i').insertAdjacentHTML('beforeend', '<span style="display: block;">[w] - Zoom Out</span>');
    document.querySelector('#mirrorTool i').insertAdjacentHTML('beforeend', '<span style="display: block;">[m] - Mirror</span>');
    
    window.addEventListener("keydown", event => {
        if (event.key === "p") {
            document.querySelector("#colorholder_chose").click();
        }
    }, true);
    
    document.querySelector(".editor-heading").textContent += " (Active)"
}
