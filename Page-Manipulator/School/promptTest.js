// V11.13.2026
(function() {
  let latestTime = Number(localStorage.getItem("latestTime")) || 0;
  let latestSeenTime = latestTime;

  // 1. Check host URL
  if (window.location.hostname !== "claude.ai") return;

  // Change this to a unique, secret room name so random people don't join
  const ROOM_TOPIC = "my-secret-example-chat-84729";

  // Clean up old instances if re-running
  const existing = document.getElementById("injectedChatOverlay");
  if (existing) existing.remove();
  const existingStyle = document.getElementById("injectedChatStyle");
  if (existingStyle) existingStyle.remove();

  // 2. Inject Dark Theme Styles
  const style = document.createElement("style");
  style.id = "injectedChatStyle";
  style.textContent = `
    #injectedChatOverlay {
      position: fixed;
      bottom: 16px;
      right: 16px;
      width: 320px;
      height: 380px;
      background-color: #2d2d2d;
      border: 1.5px solid #4a8bf5;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.65);
      font-family: Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
      color: #e0e0e0;
      display: flex;
      flex-direction: column;
      z-index: 999999;
      overflow: hidden;
    }
    #injectedChatOverlay.minimized {
      height: 34px;
      width: 180px;
    }
    #injectedChatOverlay.minimized .chat-body,
    #injectedChatOverlay.minimized .chat-footer {
      display: none;
    }
    .chat-header {
      background-color: #1e1e1e;
      padding: 8px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #444;
      cursor: pointer;
      user-select: none;
    }
    .chat-header input {
      background: #2d2d2d;
      border: 1px solid #444;
      color: #4a8bf5;
      font-family: inherit;
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 3px;
      width: 110px;
      outline: none;
    }
    .chat-body {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background-color: #252525;
    }
    .chat-msg {
      background-color: #333333;
      padding: 6px 8px;
      border-radius: 5px;
      word-break: break-word;
      line-height: 1.4;
    }
    .chat-msg .meta {
      font-size: 10px;
      color: #888888;
      margin-bottom: 2px;
      display: flex;
      justify-content: space-between;
    }
    .chat-msg .sender {
      color: #4a8bf5;
      font-weight: bold;
    }
    .msg-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 6px;
    }
    .msg-text {
      flex: 1;
      word-break: break-word;
      white-space: pre-wrap;
    }
    .copy-msg-btn {
      background: transparent;
      border: none;
      color: #888888;
      cursor: pointer;
      padding: 2px;
      border-radius: 3px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: color 0.15s, background-color 0.15s;
    }
    .copy-msg-btn:hover {
      color: #ffffff;
      background-color: #444444;
    }
    .chat-footer {
      display: flex;
      align-items: flex-end;
      padding: 8px;
      gap: 6px;
      background-color: #1e1e1e;
      border-top: 1px solid #444;
    }
    .chat-footer textarea {
      flex: 1;
      background: #2d2d2d;
      border: 1px solid #444;
      color: #ffffff;
      padding: 6px 8px;
      border-radius: 4px;
      font-family: inherit;
      font-size: 12px;
      line-height: 1.4;
      box-sizing: border-box;
      resize: none;
      overflow-y: hidden;
      max-height: 100px;
      outline: none;
    }
    .chat-footer textarea:focus {
      border-color: #4a8bf5;
    }
    .chat-footer button {
      background: #4a8bf5;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      padding: 6px 12px;
      cursor: pointer;
      font-family: inherit;
      font-weight: bold;
    }
    .chat-footer button:hover {
      background: #3a7be0;
    }
  `;
  document.head.appendChild(style);

  // 3. Build Chat UI
  const savedName = localStorage.getItem("chat_username") || "User_" + Math.floor(Math.random() * 1000);
  const container = document.createElement("div");
  container.id = "injectedChatOverlay";
  container.innerHTML = `
    <div class="chat-header" id="chatHeader">
      <input type="text" id="chatUserInput" value="${savedName}" title="Your Username" />
      <span id="chatToggleBtn" style="font-weight:bold; padding: 0 4px;">_</span>
    </div>
    <div class="chat-body" id="chatMessages"></div>
    <div class="chat-footer">
      <textarea id="chatMsgInput" rows="1" placeholder="Type a message..." autocomplete="off"></textarea>
      <button id="chatSendBtn">Send</button>
    </div>
  `;
  document.body.appendChild(container);

  const messagesDiv = document.getElementById("chatMessages");
  const msgInput = document.getElementById("chatMsgInput");
  const userInput = document.getElementById("chatUserInput");
  const sendBtn = document.getElementById("chatSendBtn");
  const toggleBtn = document.getElementById("chatToggleBtn");

  // Save username changes
  userInput.addEventListener("change", () => {
    localStorage.setItem("chat_username", userInput.value.trim() || "Anonymous");
  });

  function markAllRead() {
    const badge = document.getElementById("chatNotifBadge");
    if (badge) badge.remove();
    if (latestSeenTime > latestTime) {
      latestTime = latestSeenTime;
      localStorage.setItem("latestTime", latestTime);
    }
  }

  // Minimize / Expand toggle
  toggleBtn.addEventListener("click", () => {
    container.classList.toggle("minimized");
    const isMinimized = container.classList.contains("minimized");
    toggleBtn.textContent = isMinimized ? "+" : "_";
    if (!isMinimized) {
      markAllRead();
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  });

  // Start minimized
  toggleBtn.click();

  function addNotif() {
    if (!document.getElementById("chatNotifBadge")) {
      const badge = document.createElement("span");
      badge.id = "chatNotifBadge";
      badge.textContent = "!";
      Object.assign(badge.style, {
        backgroundColor: "#e60000",
        color: "#ffea00",
        fontWeight: "bold",
        fontSize: "12px",
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 4px rgba(0, 0, 0, 0.5)",
        flexShrink: "0",
        cursor: "pointer"
      });

      const header = document.getElementById("chatHeader");
      if (header && toggleBtn) {
        header.insertBefore(badge, toggleBtn);
      }

      badge.addEventListener("click", (e) => {
        e.stopPropagation();
        if (container.classList.contains("minimized")) {
          toggleBtn.click();
        } else {
          markAllRead();
        }
      });
    }
  }

  // Helper to safely render a message into the chatlog
  function appendMessage(sender, text, timestamp) {
    const msgEl = document.createElement("div");
    msgEl.className = "chat-msg";

    const timeStr = new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const metaEl = document.createElement("div");
    metaEl.className = "meta";
    metaEl.innerHTML = `<span class="sender"></span><span>${timeStr}</span>`;
    metaEl.querySelector(".sender").textContent = sender;

    const rowEl = document.createElement("div");
    rowEl.className = "msg-row";

    const textEl = document.createElement("div");
    textEl.className = "msg-text";
    textEl.textContent = text;

    const copyIconSVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
    const checkIconSVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-msg-btn";
    copyBtn.title = "Copy message text";
    copyBtn.innerHTML = copyIconSVG;

    copyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(text);
      copyBtn.innerHTML = checkIconSVG;
      setTimeout(() => {
        copyBtn.innerHTML = copyIconSVG;
      }, 1200);
    });

    rowEl.appendChild(textEl);
    rowEl.appendChild(copyBtn);

    msgEl.appendChild(metaEl);
    msgEl.appendChild(rowEl);
    messagesDiv.appendChild(msgEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
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
      sender: userInput.value.trim() || "Anonymous",
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
