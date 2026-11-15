// V11.15.2026
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
    
    // const target2Ago = getRelativeDateStr(-2);
    // const target1Ago = getRelativeDateStr(-1);
    // const targetToday = getRelativeDateStr(0);
    // const targetIn1 = getRelativeDateStr(1);
    // const targetIn2 = getRelativeDateStr(2);
    
    // const overdue = dueDates.filter(d => d.trim() < target2Ago).length / 4;
    // const due2Ago = dueDates.filter(d => d.trim() === target2Ago).length / 4;
    // const due1Ago = dueDates.filter(d => d.trim() === target1Ago).length / 4;
    // const dueToday = dueDates.filter(d => d.trim() === targetToday).length / 4;
    // const dueIn1 = dueDates.filter(d => d.trim() === targetIn1).length / 4;
    // const dueIn2 = dueDates.filter(d => d.trim() === targetIn2).length / 4;
    // const upcoming = dueDates.filter(d => d.trim() > targetIn2).length / 4;
    
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
    
    // alert("100\n" + assignmentCounts.join("\n"))
    const datesMessage = assignmentCounts.join("\n");
    // // alert([overdue,due2Ago,due1Ago,dueToday,dueIn1,dueIn2,upcoming])
    
    // const datesMessage = `You have ${overdue} assignments overdue.
    // You have ${due2Ago} assignments due two days ago.
    // You have ${due1Ago} assignments due one day ago.
    // You have ${dueToday} assignments due today.
    // You have ${dueIn1} assignments due in one day.
    // You have ${dueIn2} assignments due in two days.
    // You have ${upcoming} assignments upcoming.`;
    // alert("200\n" + datesMessage)

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

(async () => {
    const topic = "so-i-stop-watching-youtube-432573654749862756";
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
    alert(parsed.text ?? packet.message);
  } catch {
    alert(packet.message);
  }
    // TODO: alert not return
})();
