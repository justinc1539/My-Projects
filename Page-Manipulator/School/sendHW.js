// V11.15.2026
const mode = "Receive";
if (mode === "Send") {
    try {
        (function() {
            if (!window.location.href.match(/^https:\/\/pcti\.instructure\.com\/?(?:\?.*)?$/)) return;
            document.querySelector("#better-todo-see-more.canvasrefined-custom-btn").click();
        
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
                [(d => d.trim() > getRelativeDateStr(2)), "upcoming"],
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
} else if (mode === "Receive") {
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
    
      try {
        const parsed = JSON.parse(packet.message);
        alert(parsed.text ?? packet.message);
      } catch {
        alert(packet.message);
      }
    })();
} else alert("Invalid mode!");
