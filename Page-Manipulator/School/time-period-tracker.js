// V9.21.2026
// Active Websites: All
if (window.location.href === "https://pcti.instructure.com/?login_success=0") {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
    document.body.textContent = "login failed fahhh";
}
function getCurrentPeriod() {

    const mins = getMinutes();

    function getMinutes() {
        const now = new Date();
        return now.getHours() * 60 + now.getMinutes();
    }

    let period = "";

    if (mins < 490) period = "Before School (<8:10 AM)";
    else if (mins < 536) period = "Period 1 (8:10 AM-8:56 AM)";
    else if (mins < 581) period = "Period 2 (9:01 AM-9:41 AM)";
    else if (mins < 626) period = "Period 3 (9:46 AM-10:26 AM)";
    else if (mins < 671) period = "Period 4 (10:31 AM-11:11 AM)";
    else if (mins < 716) period = "Period 5 (11:16 AM-11:56 AM)";
    else if (mins < 761) period = "Period 6 (12:01 PM-12:41 PM)";
    else if (mins < 806) period = "Period 7 (12:46 PM-1:26 PM)";
    else if (mins < 851) period = "Period 8 (1:31 PM-2:11 PM)";
    else if (mins < 896) period = "Period 9 (2:16 PM-2:56 PM)";
    else period = "After School (>2:56 PM)";

    // alert(period);
    return period
}

if (window.location.href.includes("https://pcti.instructure.com")) {
    // alert(getCurrentPeriod());
}

// Black Box Window
(function() {
    // Create the box
    const box = document.createElement("div");
    box.id = "timeBox";
    box.style.position = "fixed";        // fixed beats Canvas layout
    box.style.top = "10px";
    box.style.left = "50%";
    box.style.transform = "translateX(-50%)";
    box.style.padding = "6px 10px";
    box.style.background = "black";
    box.style.color = "white";
    box.style.fontFamily = "monospace";
    box.style.fontSize = "12px";
    box.style.borderRadius = "4px";
    box.style.cursor = "move";
    box.style.zIndex = "999999999";      // Canvas can't beat this
    // box.textContent = new Date().toLocaleTimeString();
    document.body.appendChild(box);

    // Update time every second
    setInterval(() => {
        // box.textContent = new Date().toLocaleTimeString();
        currentTime = new Date().toLocaleTimeString();
        box.textContent = `${currentTime} ${getCurrentPeriod()}`;
    }, 100);

    // Dragging logic
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    box.addEventListener("mousedown", e => {
        isDragging = true;

        // Remove centering transform once dragging starts
        box.style.transform = "";

        offsetX = e.clientX - box.getBoundingClientRect().left;
        offsetY = e.clientY - box.getBoundingClientRect().top;
    });

    window.addEventListener("mousemove", e => {
        if (!isDragging) return;
        box.style.left = e.clientX - offsetX + "px";
        box.style.top = e.clientY - offsetY + "px";
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // Canvas sometimes re-renders the page.
    // This keeps your box visible even if Canvas tries to remove it.
    setInterval(() => {
        if (!document.getElementById("timeBox")) {
            document.body.appendChild(box);
        }
    }, 500);
})();