// V11.17.2026
const mode = "Auto";
const inCanvas = window.location.href.match(/^https:\/\/pcti\.instructure\.com\/?(?:\?.*)?$/);
if (mode === "Send" || (mode === "Auto" && inCanvas)) {
    try {
        (function() {
            if (!inCanvas) return;
            const seeMoreBtn = document.querySelector("#better-todo-see-more.canvasrefined-custom-btn");
            if (seeMoreBtn) seeMoreBtn.click();
        
            const dueDates = [];
            document.querySelectorAll(".todo-group-list").forEach(aList => {
                aList.querySelectorAll("div div div div").forEach(aDiv => {
                    const spans = aDiv.querySelectorAll("span");
                    if (spans.length > 0) {
                        const dueDate = spans[1].textContent;
                        dueDates.push(dueDate.split(" at")[0].split("due ")[1]);
                    }
                });
            });
            // Assuming `dueDates` is your array of date strings (e.g., ["Sep 24", "Nov 15", ...])
            function getRelativeDateStr(daysOffset) {
              const date = new Date();
              date.setDate(date.getDate() + daysOffset);
              const month = date.toLocaleString("en-US", { month: "short" });
              const day = date.getDate();
              return `${month} ${day}`;
            }
            
            const assignmentCounts = [
                [(d => d.trim() < getRelativeDateStr(-2)), "overdue"],
                [(d => d.trim() === getRelativeDateStr(-2)), "due two days ago"],
                [(d => d.trim() === getRelativeDateStr(-1)), "due yesterday"],
                [(d => d.trim() === getRelativeDateStr(0)), "due today"],
                [(d => d.trim() === getRelativeDateStr(1)), "due tomorrow"],
                [(d => d.trim() === getRelativeDateStr(2)), "due in two days"],
                [(d => d.trim() === getRelativeDateStr(3)), "due in three days"],
                [(d => d.trim() > getRelativeDateStr(3)), "upcoming"],
            ].map(ele => {
                return `You have ${dueDates.filter(ele[0]).length / 4} ${ele[1]}.`;
            });

            const now = new Date();
            const datePart = now.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            });
            const timePart = now.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            });
            const formatted = `${datePart} at ${timePart}`;
            const datesMessage = `Last Check: ${formatted}\n${assignmentCounts.join("\n")}`;
        
          // Change this to a unique, secret room name so random people don't join
          const ROOM_TOPIC = "so-i-stop-watching-youtube-432573654749862756";
        
          // 4. Send Message (POST)
          (async () => {
            const text = datesMessage;
            if (!text) return;
        
            const payload = JSON.stringify({
              sender: "School Account",
              text: text
            });
        
            await fetch(`https://ntfy.sh/${ROOM_TOPIC}`, {
              method: "POST",
              body: payload
            });
          })();
        })();
    } catch (e) {alert(e.stack)}
} else if (mode === "Receive" || (mode === "Auto" && !inCanvas)) {
    (async () => {
        const topic = "so-i-stop-watching-youtube-432573654749862756";
      const response = await fetch(`https://ntfy.sh/${topic}/json?poll=1&since=latest`);
      const rawText = await response.text();
    
      if (!rawText.trim()) {
        return alert("No text was found!");
      }
    
      const lines = rawText.trim().split("\n");
      const packet = JSON.parse(lines[lines.length - 1]);
    
      if (packet.event !== "message") {
        return alert("Latest packet was not a message.");
      }
    
      let message;
      try {
        const parsed = JSON.parse(packet.message);
        // alert(parsed.text ?? packet.message);
        message = parsed.text ?? packet.message;
      } catch {
        // alert(packet.message);
        message = packet.message;
      }
    //   alert(message) // TODO: make todoBox for todo list
      
        // Black Time Box Window
        (function() {
            // Create the todoBox
            const todoBox = document.createElement("div");
            todoBox.id = "todoBox";
            todoBox.style.position = "fixed";        // fixed beats Canvas layout
            todoBox.style.top = "0";
            todoBox.style.left = "0";
            todoBox.style.padding = "6px 10px";
            todoBox.style.background = "black";
            todoBox.style.color = "white";
            todoBox.style.fontFamily = "monospace";
            todoBox.style.fontSize = "12px";
            todoBox.style.borderRadius = "4px";
            todoBox.style.cursor = "move";
            todoBox.style.zIndex = "2147483646";      // Canvas can't beat this
            todoBox.style.whiteSpace = 'pre-line';
            // todoBox.textContent = new Date().toLocaleTimeString();
            document.body.appendChild(todoBox);
        
            // Update time every second
            setInterval(() => {
                const dayType = "normal"; // Time Tracker: Not a Normal School Day? Not a Full Day? Change This!
                // todoBox.textContent = new Date().toLocaleTimeString();
                currentTime = new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York" });
                todoBox.textContent = message;
                
                const displayPeriodEnd = className => {
                    for (let i = 0; i < 10; i++) {
                        alert(`${className} is ending!`);
                    }
                }
        
                // Optional TTTODO: Make function with array courses, arrray times (either values or a list including value and value to subtract from first value)
                if (dayType === "normal") {
                    if (currentTime === "8:55:20 AM") displayPeriodEnd("AP Physics C: Mechanics");
                    else if (currentTime === "9:40:20 AM") displayPeriodEnd("AP Calculus B/C");
                    else if (currentTime === "10:25:20 AM") displayPeriodEnd("Health");
                    else if (currentTime === "11:09:20 AM") displayPeriodEnd("APUSH");
                    else if (currentTime === "11:55:20 AM") displayPeriodEnd("English 4 (H)");
                    else if (currentTime === "12:38:20 PM") displayPeriodEnd("AP Statistics");
                    else if (currentTime === "1:02:20 PM") displayPeriodEnd("Lunch");
                    else if (currentTime === "2:55:20 PM") displayPeriodEnd("AP Computer Science A");
                } else if (dayType === "half") {
                    if (currentTime === "8:41:20 AM") displayPeriodEnd("AP Physics C: Mechanics");
                    else if (currentTime === "9:14:20 AM") displayPeriodEnd("AP Calculus B/C");
                    else if (currentTime === "9:47:20 AM") displayPeriodEnd("Health");
                    else if (currentTime === "10:19:20 AM") displayPeriodEnd("APUSH");
                    else if (currentTime === "10:53:20 AM") displayPeriodEnd("English 4 (H)");
                    else if (currentTime === "11:24:20 AM") displayPeriodEnd("AP Statistics");
                    else if (currentTime === "11:42:20 PM") displayPeriodEnd("Lunch");
                    else if (currentTime === "1:05:20 PM") displayPeriodEnd("AP Computer Science A");
                } else if (dayType === "delayed") {
                    if (currentTime === "10:39:20 AM") displayPeriodEnd("AP Physics C: Mechanics");
                    else if (currentTime === "11:11:20 AM") displayPeriodEnd("AP Calculus B/C");
                    else if (currentTime === "11:43:20 AM") displayPeriodEnd("Health");
                    else if (currentTime === "12:14:20 PM") displayPeriodEnd("APUSH");
                    else if (currentTime === "12:47:20 PM") displayPeriodEnd("English 4 (H)");
                    else if (currentTime === "1:18:20 PM") displayPeriodEnd("AP Statistics");
                    else if (currentTime === "1:34:20 PM") displayPeriodEnd("Lunch");
                    else if (currentTime === "2:55:20 PM") displayPeriodEnd("AP Computer Science A");
                }
            }, 100);
        
            // Dragging logic
            let isDragging = false;
            let offsetX = 0;
            let offsetY = 0;
        
            todoBox.addEventListener("mousedown", e => {
                event.preventDefault();
                isDragging = true;
        
                // Remove centering transform once dragging starts
                todoBox.style.transform = "";
        
                offsetX = e.clientX - todoBox.getBoundingClientRect().left;
                offsetY = e.clientY - todoBox.getBoundingClientRect().top;
            });
        
            window.addEventListener("mousemove", e => {
                if (!isDragging) return;
                todoBox.style.left = e.clientX - offsetX + "px";
                todoBox.style.top = e.clientY - offsetY + "px";
            });
        
            window.addEventListener("mouseup", () => {
                isDragging = false;
            });
        })();
    })();
} else alert("Invalid mode!");
