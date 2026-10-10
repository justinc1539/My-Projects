let isCreatingOffscreen = false;

async function setupOffscreen() {
    if (isCreatingOffscreen) return;
    
    try {
        const hasDoc = await chrome.offscreen.hasDocument();
        if (!hasDoc) {
            isCreatingOffscreen = true;
            await chrome.offscreen.createDocument({
                url: "offscreen.html",
                reasons: ["BLOBS"],
                justification: "Polls Google Apps Script for chat updates every 5 seconds."
            });
        }
    } catch (err) {
        if (!err.message.includes("Only a single offscreen document may be created")) {
            console.error("Failed to set up offscreen document:", err);
        }
    } finally {
        isCreatingOffscreen = false;
    }
}

chrome.runtime.onInstalled.addListener(setupOffscreen);
chrome.runtime.onStartup.addListener(setupOffscreen);
setupOffscreen();

// Receive text payload from offscreen.js
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "NEW_CHAT_MESSAGE" && msg.text) {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "google_docs.png",
            title: "New message received in the chat!",
            message: msg.text.slice(0, 240)
        });
    }
});