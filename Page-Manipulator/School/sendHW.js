// V11.15.2026
(function() {
    if (!window.location.href.match(/^https:\/\/pcti\.instructure\.com\/?(?:\?.*)?$/)) return;

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
    
    const overdue = dueDates.filter(d => d.trim() < target2Ago).length / 4;
    const due2Ago = dueDates.filter(d => d.trim() === target2Ago).length / 4;
    const due1Ago = dueDates.filter(d => d.trim() === target1Ago).length / 4;
    const dueToday = dueDates.filter(d => d.trim() === targetToday).length / 4;
    const dueIn1 = dueDates.filter(d => d.trim() === targetIn1).length / 4;
    const dueIn2 = dueDates.filter(d => d.trim() === targetIn2).length / 4;
    
    const datesMessage = `You have ${overdue} assignments overdue.
    You have ${due2Ago} assignments due two days ago.
    You have ${due1Ago} assignments due one day ago.
    You have ${dueToday} assignments due today.
    You have ${dueIn1} assignments due in one day.
    You have ${dueIn2} assignments due in two days.`;

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

    alert(`post https://ntfy.sh/${ROOM_TOPIC}`)
    await fetch(`https://ntfy.sh/${ROOM_TOPIC}`, {
      method: "POST",
      body: payload
    });
    alert("sent!")
  })();
})();

(async () => {
    alert(11)
    const topic = "so-i-stop-watching-youtube-432573654749862756";
    alert(12)
    alert(`receive https://ntfy.sh/${topic}`)
  const response = await fetch(`https://ntfy.sh/${topic}/json?poll=1&since=latest`);
  alert(13)
  const rawText = await response.text();
  alert(14)

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
    // TODO: alert not return
})();
