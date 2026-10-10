// See https://script.google.com/home/projects/1S6RmJobpGIMkka6OI-TZK1spR4o1GOb0O8wqAInNTMlapDQwg4HiNnJw/edit

// Connect port to let offscreen.js know the popup is currently open
const popupPort = chrome.runtime.connect({ name: "POPUP_STATE" });

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwf22IFzX2olDy_SsGLpLKZAL9DxEqLSe5m1M-ERRQMlLdAfUIF4qpZwKhmJcMw3yjddw/exec";

let username = "Unknown";
let selectedImage = null;

// Load saved username
chrome.storage.local.get(["username"], data => {
    username = data.username || "Unknown";
    document.getElementById("usernameInput").value = username;
});

if (document.getElementById("saveUsernameBtn")) {
    document.getElementById("saveUsernameBtn").onclick = () => {
        const newName = document.getElementById("usernameInput").value.trim();
        if (!newName) return;
        username = newName;
        chrome.storage.local.set({ username: newName });
    };
}

// Fetch chat content dynamically
async function loadChatLog() {
    try {
        const res = await fetch(SCRIPT_URL);
        if (!res.ok) return;

        const text = await res.text();
        if (text.includes("<!DOCTYPE html>") || text.trim() === "SERVICE_BUSY") {
            return;
        }

        const chatDiv = document.getElementById("chatLog");
        if (chatDiv) {
            chatDiv.innerHTML = text;
        }
    } catch (e) {
        console.error("Failed to load log:", e);
    }
}

// Load log immediately and poll every 3 seconds (ONLY NECESSARY IF NOT USING IFRAME)
// loadChatLog();
// setInterval(loadChatLog, 3000);

// File picker controls
document.getElementById("uploadBtn").onclick = () => {
    document.getElementById("imageUpload").click();
};

document.getElementById("imageUpload").onchange = (e) => {
    selectedImage = e.target.files[0];
    if (selectedImage) {
        document.getElementById("uploadedFileName").textContent = selectedImage.name;
        document.getElementById("myImageTagId").src = URL.createObjectURL(selectedImage);
        document.getElementById("removeUploadBtn").style.display = "inline-block";
    }
};

document.getElementById("removeUploadBtn").onclick = () => {
    selectedImage = null;
    document.getElementById("uploadedFileName").textContent = "";
    document.getElementById("myImageTagId").src = "";
    document.getElementById("removeUploadBtn").style.display = "none";
};

// Convert image to base64 helper
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// 1. Trigger fast-polling immediately when the popup is opened
chrome.runtime.sendMessage({ type: "USER_ACTIVATED_CHAT" });

// Load log immediately on popup open
// loadChatLog();

// Send message logic
document.getElementById("sendBtn").onclick = async () => {
    const msg = document.getElementById("msg").value.trim();
    if (!msg && !selectedImage) return;

    // Immediately clear any active notification spam & update activity timestamp
    chrome.runtime.sendMessage({ 
        type: "USER_ACTIVATED_CHAT",
        sentMessageSnippet: msg 
    });

    try {
        let base64String = null;
        let mimeType = "image/png";
        let fileName = "uploadedImage";

        if (selectedImage) {
            const fullDataUrl = await fileToBase64(selectedImage);
            base64String = fullDataUrl.split(',')[1];
            mimeType = selectedImage.type || "image/png";
            fileName = selectedImage.name || "uploadedImage";
        }

        await fetch(SCRIPT_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify({
                username: username,
                message: msg,
                imageString: base64String,
                mimeType: mimeType,
                fileName: fileName
            })
        });

        // Reset UI
        selectedImage = null;
        document.getElementById("uploadedFileName").textContent = "";
        document.getElementById("myImageTagId").src = "";
        document.getElementById("removeUploadBtn").style.display = "none";
        document.getElementById("msg").value = "";

        setTimeout(loadChatLog, 1000);

    } catch (err) {
        console.error("Failed to send message:", err);
    }
};