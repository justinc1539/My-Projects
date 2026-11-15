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

const target2Ago = getRelativeDateStr(-2);
const target1Ago = getRelativeDateStr(-1);
const targetToday = getRelativeDateStr(0);
const targetIn1 = getRelativeDateStr(1);
const targetIn2 = getRelativeDateStr(2);

const due2Ago = dueDates.filter(d => d.trim() === target2Ago).length / 4;
const due1Ago = dueDates.filter(d => d.trim() === target1Ago).length / 4;
const dueToday = dueDates.filter(d => d.trim() === targetToday).length / 4;
const dueIn1 = dueDates.filter(d => d.trim() === targetIn1).length / 4;
const dueIn2 = dueDates.filter(d => d.trim() === targetIn2).length / 4;

const datesMessage = `You have ${due2Ago} assignments due two days ago.
You have ${due1Ago} assignments due one day ago.
You have ${dueToday} assignments due today.
You have ${dueIn1} assignments due in one day.
You have ${dueIn2} assignments due in two days.`;
navigator.clipboard.writeText(datesMessage)
  .then(() => {
    alert("Text copied to clipboard!");
  })
  .catch(err => {
    alert("Failed to copy:", err);
  });
alert(dueDates)
alert(datesMessage)
// TODO: ^^^^^
// V11.15.2026
(function() {
    return;
    alert("no")
  // Change this to a unique, secret room name so random people don't join
  const ROOM_TOPIC = "so-i-stop-watching-youtube-432573654749862756";

  // 3. Build Chat UI
  const savedName = localStorage.getItem("chat_username") || "User_" + Math.floor(Math.random() * 1000);

  function markAllRead() {
    const badge = document.getElementById("chatNotifBadge");
    if (badge) badge.remove();
    if (latestSeenTime > latestTime) {
      latestTime = latestSeenTime;
      localStorage.setItem("latestTime", latestTime);
    }
  }

  // Auto-expand textarea height to fit multi-line text
  function autoResizeInput() {
    msgInput.style.height = "auto";
    msgInput.style.height = Math.min(msgInput.scrollHeight, 100) + "px";
    msgInput.style.overflowY = msgInput.scrollHeight > 100 ? "auto" : "hidden";
  }

  msgInput.addEventListener("input", autoResizeInput);

  // 4. Send Message (POST)
  async function sendMessage() {
    const text = msgInput.value.trim();
    if (!text) return;

    const payload = JSON.stringify({
      sender: "School Account",
      text: text
    });

    msgInput.value = "";
    autoResizeInput();

    await fetch(`https://ntfy.sh/${ROOM_TOPIC}`, {
      method: "POST",
      body: payload
    });
  }

  sendBtn.addEventListener("click", sendMessage);

  // Isolate keyboard events; Enter sends, Shift+Enter inserts newline
  [msgInput, userInput].forEach(el => {
    el.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if (e.key === "Enter" && !e.shiftKey && el === msgInput) {
        e.preventDefault();
        sendMessage();
      }
    });
  });

  // 5. Receive Live Messages & History (GET via Server-Sent Events)
  const eventSource = new EventSource(`https://ntfy.sh/${ROOM_TOPIC}/sse?since=12h`);

  eventSource.onmessage = (event) => {
    const packet = JSON.parse(event.data);
    if (packet.event !== "message") return;

    try {
      const data = JSON.parse(packet.message);
      appendMessage(data.sender, data.text, packet.time);
    } catch {
      appendMessage("System", packet.message, packet.time);
    }

    if (packet.time > latestSeenTime) {
      latestSeenTime = packet.time;
    }

    if (packet.time > latestTime) {
      if (container.classList.contains("minimized")) {
        addNotif();
      } else {
        markAllRead();
      }
    }
  };
})();

async function getLatestMessage(topic = "my-secret-example-chat-84729") {
  const response = await fetch(`https://ntfy.sh/${topic}/json?poll=1&since=latest`);
  const rawText = await response.text();

  if (!rawText.trim()) {
    return null;
  }

  const lines = rawText.trim().split("\n");
  const packet = JSON.parse(lines[lines.length - 1]);

  if (packet.event !== "message") {
    return null;
  }

  try {
    const parsed = JSON.parse(packet.message);
    return parsed.text ?? packet.message;
  } catch {
    return packet.message;
  }
}
