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
    document.querySelector('#colorholder_chose i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[p] - Pencil</span>');
    document.querySelector('#erasepixel i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[e] - Eraser</span>');
    document.querySelector('#autotone i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[a] - Auto Tone</span>');
    document.querySelector('#pickcolor i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[c] - Color Picker</span>');
    document.querySelector('#bucket i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[b] - Bucket</span>');
    document.querySelector('#undo i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[u] - Undo</span>');
    document.querySelector('#redo i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[r] - Redo</span>');
    document.querySelector('#darker i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[z] - Darken Color</span>');
    document.querySelector('#lighter i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[z] - Lighten Color</span>');
    document.querySelector('#zoom-in i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[q] - Zoom In</span>');
    document.querySelector('#zoom-out i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[w] - Zoom Out</span>');
    document.querySelector('#mirrorTool i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[m] - Mirror</span>');
    
    document.querySelector('#showObject').textContent = `[i] - ${document.querySelector('#showObject').textContent}`;
    document.querySelector('#showOverlay').textContent = `[p] - ${document.querySelector('#showOverlay').textContent}`;
    
    document.querySelector('div.head.ed_head a').insertAdjacentHTML('afterbegin', '<span style="display: block;">[o]</span>');
    document.querySelector("div.armR.ed_leftarm").insertAdjacentHTML('afterbegin', '<span style="display: block;">[k]</span>');
    document.querySelector("div.body.ed_body").insertAdjacentHTML('afterbegin', '<span style="display: block;">[l]</span>');
    document.querySelector("div.armL.ed_leftarm").insertAdjacentHTML('afterbegin', '<span style="display: block;">[;]</span>');
    document.querySelector("div.legL.ed_leg_left").insertAdjacentHTML('afterbegin', '<span style="display: block;">[,]</span>');
    document.querySelector("div.legR.ed_leg_right").insertAdjacentHTML('afterbegin', '<span style="display: block;">[.]</span>');
    
    window.addEventListener("keydown", event => {
        if (event.key === "i") document.querySelector('#showObject').click()
        if (event.key === "p") document.querySelector('#showOverlay').click()
        
        if (event.key === "o") document.querySelector("div.head.ed_head").click();
        if (event.key === "k") document.querySelector("div.armR.ed_leftarm").click();
        if (event.key === "l") document.querySelector("div.body.ed_body").click();
        if (event.key === ";") document.querySelector("div.armL.ed_leftarm").click();
        if (event.key === ",") document.querySelector("div.legL.ed_leg_left").click();
        if (event.key === ".") document.querySelector("div.legR.ed_leg_right").click();
    }, true);
    
    document.querySelector(".editor-heading").textContent += " (Active)"
}
