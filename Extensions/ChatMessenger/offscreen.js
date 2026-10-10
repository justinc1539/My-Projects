const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwf22IFzX2olDy_SsGLpLKZAL9DxEqLSe5m1M-ERRQMlLdAfUIF4qpZwKhmJcMw3yjddw/exec";

// Greedy Optimization Intervals
const FAST_INTERVAL = 5000;         // 5s during active chat
const SLOW_INTERVAL = 60000;        // 60s while idling
const ACTIVE_WINDOW = 30000;        // 30s active window
const SPAM_NOTIF_INTERVAL = 20000;  // 20s notification interval

let lastLogText = "";
let pollTimer = null;
let notifSpamTimer = null;
let currentInterval = SLOW_INTERVAL;
let lastActivityTime = 0;

let hasUnread = false;
let unreadSnippet = "";
let isPopupOpen = false; // Tracks if popup window is open right now

async function checkForNewMessages() {
    // Skip fetching if unread, UNLESS the popup is open (so active viewing updates)
    if (hasUnread && !isPopupOpen) return;

    try {
        const res = await fetch(SCRIPT_URL);
        if (!res.ok) return;

        const currentText = await res.text();
        if (currentText.includes("<!DOCTYPE html>") || currentText.trim() === "SERVICE_BUSY") return;

        // Bootstrapping initial text
        if (!lastLogText) {
            lastLogText = currentText;
            return;
        }

        // New message detected!
        if (currentText && currentText !== lastLogText) {
            lastLogText = currentText;
            lastActivityTime = Date.now();

            // Jump to fast polling mode
            setPollingInterval(FAST_INTERVAL);

            // Only trigger notifications/spam if the popup is CLOSED
            if (!isPopupOpen) {
                hasUnread = true;
                unreadSnippet = currentText;
                sendNotification();
                startNotifSpam();
            }
        }
    } catch (e) {
        // Swallowing network blips safely
    } finally {
        if (currentInterval === FAST_INTERVAL && Date.now() - lastActivityTime > ACTIVE_WINDOW) {
            setPollingInterval(SLOW_INTERVAL);
        }
    }
}

function sendNotification() {
    // Double check: Never send notifications if the user has the popup open
    if (!unreadSnippet || isPopupOpen) return;

    chrome.runtime.sendMessage({
        type: "NEW_CHAT_MESSAGE",
        text: unreadSnippet
    });
}

function startNotifSpam() {
    stopNotifSpam();
    if (!isPopupOpen) {
        notifSpamTimer = setInterval(sendNotification, SPAM_NOTIF_INTERVAL);
    }
}

function stopNotifSpam() {
    if (notifSpamTimer) {
        clearInterval(notifSpamTimer);
        notifSpamTimer = null;
    }
}

function setPollingInterval(newInterval) {
    if (currentInterval === newInterval && pollTimer !== null) return;
    
    currentInterval = newInterval;
    if (pollTimer) clearInterval(pollTimer);
    
    pollTimer = setInterval(checkForNewMessages, currentInterval);
}

// Track popup connection state
chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "POPUP_STATE") {
        isPopupOpen = true;
        hasUnread = false;
        unreadSnippet = "";
        stopNotifSpam(); // Kill notifications immediately while open

        lastActivityTime = Date.now();
        setPollingInterval(FAST_INTERVAL);

        // When the user closes the popup
        port.onDisconnect.addListener(() => {
            isPopupOpen = false;
        });
    }
});

// Handle standard messaging triggers (e.g. on message send)
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "USER_ACTIVATED_CHAT") {
        hasUnread = false;
        unreadSnippet = "";
        stopNotifSpam();
        
        lastActivityTime = Date.now();
        setPollingInterval(FAST_INTERVAL);

        if (msg.sentMessageSnippet && lastLogText) {
            lastLogText += "\n" + msg.sentMessageSnippet;
        }
    }
});

// Start initial polling
setPollingInterval(SLOW_INTERVAL);
checkForNewMessages();