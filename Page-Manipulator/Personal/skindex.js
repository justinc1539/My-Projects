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
    document.querySelector('#lighter i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[x] - Lighten Color</span>');
    document.querySelector('#zoom-in i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[q] - Zoom In</span>');
    document.querySelector('#zoom-out i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[w] - Zoom Out</span>');
    document.querySelector('#mirrorTool i').insertAdjacentHTML('afterbegin', '<span style="display: block;">[m] - Mirror</span>');
    
    document.querySelector('#showObject').textContent = `[6] - ${document.querySelector('#showObject').textContent}`;
    document.querySelector('#showOverlay').textContent = `[8] - ${document.querySelector('#showOverlay').textContent}`;

    const togglesHTML = `<div id="toggles">
            <!-- <div class="controls">
                <div title="hide/show skin body" class="underlay ed_gridbtn_body"><a id="showObject" class="btn btn-default">[6] - Body</a>
                </div>
                <div title="hide/show skin overlay" class="overlay ed_gridbtn_overlay"><a id="showOverlay" class="btn btn-default">[8] - Outer
                        layer</a></div>
            </div> -->

            <div class="model-body">
                <div data-parts="headOverlay,head" class="head ed_head"><a class=""><span style="display: block;">[7]</span>&nbsp;</a></div>
                <div data-parts="armROverlay,armR" class="armR ed_leftarm"><span style="display: block;">[y]</span><a class="check_a">&nbsp;</a></div>
                <div data-parts="bodyOverlay,body" class="body ed_body"><span style="display: block;">[j]</span><a class="">&nbsp;</a></div>
                <div data-parts="armLOverlay,armL" class="armL ed_leftarm"><span style="display: block;">[i]</span><a class="">&nbsp;</a></div>
                <div data-parts="legROverlay,legR" class="legL ed_leg_left"><span style="display: block;">[h]</span><a class="">&nbsp;</a></div>
                <div data-parts="legLOverlay,legL" class="legR ed_leg_right"><span style="display: block;">[k]</span><a class="check_a">&nbsp;</a></div>
            </div>

        </div>`
    document.querySelector('#toggles').insertAdjacentHTML('afterend', togglesHTML);
    /*document.querySelector('div.head.ed_head a').insertAdjacentHTML('afterbegin', '<span style="display: block;">[7]</span>');
    document.querySelector("div.armR.ed_leftarm").insertAdjacentHTML('afterbegin', '<span style="display: block;">[y]</span>');
    document.querySelector("div.body.ed_body").insertAdjacentHTML('afterbegin', '<span style="display: block;">[j]</span>');
    document.querySelector("div.armL.ed_leftarm").insertAdjacentHTML('afterbegin', '<span style="display: block;">[i]</span>');
    document.querySelector("div.legL.ed_leg_left").insertAdjacentHTML('afterbegin', '<span style="display: block;">[h]</span>');
    document.querySelector("div.legR.ed_leg_right").insertAdjacentHTML('afterbegin', '<span style="display: block;">[k]</span>');*/
    
    window.addEventListener("keydown", event => {
        if (event.key === "6") document.querySelector('#showObject').click()
        if (event.key === "8") document.querySelector('#showOverlay').click()
        
        if (event.key === "7") document.querySelector("div.head.ed_head").click();
        if (event.key === "y") document.querySelector("div.armR.ed_leftarm").click();
        if (event.key === "j") document.querySelector("div.body.ed_body").click();
        if (event.key === "i") document.querySelector("div.armL.ed_leftarm").click();
        if (event.key === "h") document.querySelector("div.legL.ed_leg_left").click();
        if (event.key === "k") document.querySelector("div.legR.ed_leg_right").click();
        
        if (["u", "r", "z", "x", "q", "w"].includes(event.key)) document.querySelectorAll(".active").forEach(ele => ele.classList.remove("active"));
        if (event.key === "u") document.querySelector('#undo').className += " active";
        if (event.key === "r") document.querySelector('#redo').className += " active";
        if (event.key === "z") document.querySelector('#darker').className += " active";
        if (event.key === "x") document.querySelector('#lighter').className += " active";
        if (event.key === "q") document.querySelector('#zoom-in').className += " active";
        if (event.key === "w") document.querySelector('#zoom-out').className += " active";
    }, true);
    
    document.querySelector(".editor-heading").textContent += " (Active)"
}
