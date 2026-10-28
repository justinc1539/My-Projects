// V10.28.2026
// Active Websites: All
function formatTime(minutes, includeEnd=0) {
    const hour = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const meridiem = hour > 12 ? "PM" : "AM";
    let timeString = `${hour % 12 === 0 ? "12" : hour % 12}:${String(mins).padStart(2, "0")} ${meridiem}`;
    if (includeEnd) timeString += `-${formatTime(minutes + includeEnd)}`
    return timeString;
}

function getCurrentPeriodStr(dayType, mins, times, periodLength, firstPeriodExtra, breakTime) {
    // Period 1 Extra: {normal: +6; delayed: +12; half: +4}
    // Break: {normal: +5; delayed: +4; half: +5}
    // Tell me why Delayed Opening gives 1st period a whole 12 EXTRA MINUTES and only gives us 4 minutes of break instead of 5
    for (let i = 0; i < times.length; i++) {
        if (mins < times[i]) {
            if (i === 0) return `Before School (<${formatTime(times[0])})`;
            if (i === 1) return `Period 1 (${formatTime(times[0], periodLength + firstPeriodExtra)})`;
            return `Period ${i} (${formatTime(times[i-1] + breakTime, periodLength)})`;
        }
    }
    return `After School (>${formatTime(times[times.length - 1])})`;
}

function getCurrentPeriod(dayType) {
    try{ // TTTODO: delete when done

    const mins = getMinutes();

    function getMinutes() {
        const now = new Date();
        // return now.getHours() * 60 + now.getMinutes();
        const njHour = parseInt(now.toLocaleString("en-US", { timeZone: "America/New_York", hour: "2-digit", hour12: false }), 10);
        const njMinute = parseInt(now.toLocaleString("en-US", { timeZone: "America/New_York", minute: "2-digit" }), 10);
        
        return njHour * 60 + njMinute;
    }

    let period = "";
    if (dayType === "normal") period = getCurrentPeriodStr(dayType, mins, [490, 536, 581, 626, 671, 716, 761, 806, 851, 896], 40, 6, 5);
    else if (dayType === "half") period = getCurrentPeriodStr(dayType, mins, [490, 522, 555, 588, 621, 654, 687, 720, 753, 786], 28, 4, 5);
    else if (dayType === "delayed") period = getCurrentPeriodStr(dayType, mins, [600, 640, 672, 704, 736, 768, 800, 832, 864, 896], 28, 12, 4); // TTTODO: Make delyaed opening schedule
    else period = 'Invalid day type (must be "normal", "half", or "delayed")';

    return period;
    } catch(error) {alert(error.stack)}
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
    box.style.zIndex = "2147483646";      // Canvas can't beat this
    // box.textContent = new Date().toLocaleTimeString();
    document.body.appendChild(box);

    // Update time every second
    setInterval(() => {
        const dayType = "normal"; // Time Tracker: Not a Normal School Day? Not a Full Day? Change This!
        // box.textContent = new Date().toLocaleTimeString();
        currentTime = new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York" });
        box.textContent = `${currentTime} ${getCurrentPeriod(dayType)}`;
        
        const displayPeriodEnd = className => {
            for (let i = 0; i < 10; i++) {
                alert(`${className} is ending!`);
            }
        }
        // TTTODO: Also include for delayed opening
        // Optional TTTODO: Make function with array courses, arrray times (either values or a list including value and value to subtract from first value)
        if (dayType === "normal") {
            if (currentTime === "8:55:20 AM") displayPeriodEnd("AP Physics C: Mechanics");
            else if (currentTime === "9:40:20 AM") displayPeriodEnd("AP Calculus B/C");
            else if (currentTime === "10:25:20 AM") displayPeriodEnd("Health");
            else if (currentTime === "11:09:20 AM") displayPeriodEnd("APUSH");
            else if (currentTime === "11:55:20 AM") displayPeriodEnd("English 4 (H)");
            else if (currentTime === "12:38:20 PM") displayPeriodEnd("AP Statistics");
            else if (currentTime === "2:55:20 PM") displayPeriodEnd("AP Computer Science A");
        } else if (dayType === "half") {
            if (currentTime === "8:41:20 AM") displayPeriodEnd("AP Physics C: Mechanics");
            else if (currentTime === "9:14:20 AM") displayPeriodEnd("AP Calculus B/C");
            else if (currentTime === "9:47:20 AM") displayPeriodEnd("Health");
            else if (currentTime === "10:19:20 AM") displayPeriodEnd("APUSH");
            else if (currentTime === "10:53:20 AM") displayPeriodEnd("English 4 (H)");
            else if (currentTime === "11:24:20 AM") displayPeriodEnd("AP Statistics");
            else if (currentTime === "1:05:20 PM") displayPeriodEnd("AP Computer Science A");
        } else if (dayType === "delayed") {
            if (currentTime === "10:39:20 AM") displayPeriodEnd("AP Physics C: Mechanics");
            else if (currentTime === "11:11:20 AM") displayPeriodEnd("AP Calculus B/C");
            else if (currentTime === "11:43:20 AM") displayPeriodEnd("Health");
            else if (currentTime === "12:14:20 PM") displayPeriodEnd("APUSH");
            else if (currentTime === "12:47:20 PM") displayPeriodEnd("English 4 (H)");
            else if (currentTime === "1:18:20 PM") displayPeriodEnd("AP Statistics");
            else if (currentTime === "2:55:20 PM") displayPeriodEnd("AP Computer Science A");
        }
    }, 100);

    // Dragging logic
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    box.addEventListener("mousedown", e => {
        event.preventDefault();
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
