(function () {
    const HORIZONTAL_SCALE = 1;
    document.body.style.transformOrigin = 'top left';
    document.body.style.transform = `scaleX(${HORIZONTAL_SCALE})`;

    // 1. Clean up existing stage if it already exists
    let oldStage = document.getElementById('curved-tv-stage');
    if (oldStage) oldStage.remove();

    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.background = '#0b0b0b';
    
    const stage = document.createElement('div');
    stage.id = 'curved-tv-stage';
    stage.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    // Create an extra-wide container to pan across
    const panner = document.createElement('div');
    panner.style.cssText = `
        position: absolute;
        width: 200vw;
        height: 100vh;
        display: flex;
        transform: translateX(0px);
        transition: transform 0.05s ease-out;
    `;

    const contentWrapper = document.createElement('div');
    contentWrapper.style.cssText = `
        width: 200vw;
        min-height: 100vh;
        background: white;
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: none;
    `;
    while (document.body.firstChild) {
        contentWrapper.appendChild(document.body.firstChild);
    }

    panner.appendChild(contentWrapper);
    stage.appendChild(panner);
    document.body.appendChild(stage);

    // 2. Smooth mouse panning (moves left/right cleanly without any 3D slant)
    window.addEventListener('mousemove', (e) => {
        const mouseNormX = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
        const maxScrollOffset = .5*HORIZONTAL_SCALE*window.innerWidth; // How far it slides
        const targetX = mouseNormX * (-maxScrollOffset / 2); 
        
        panner.style.transform = `translateX(${targetX}px)`;
    });

    // 3. Custom wheel scroll handler
    window.addEventListener('wheel', (event) => {
        event.preventDefault();
        contentWrapper.scrollBy({
            top: event.deltaY,
            left: 0,
            behavior: 'auto'
        });
    }, { passive: false });
})();
