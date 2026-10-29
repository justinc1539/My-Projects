// V10.28.2026
// Active websites: all

const pausedAtts = `{
  "currentTime": 573.32,
  "videoBytesLoaded": 0.5165084327035647,
  "videoLoadedFraction": 0.5165084327035647,
  "currentTimeLastUpdated_": 1793150607.027,
  "playbackRate": 1,
  "mediaReferenceTime": 573.32,
  "progressState": {
    "airingStart": 0,
    "airingEnd": 0,
    "allowSeeking": true,
    "clipEnd": null,
    "clipStart": 573,
    "current": 573.32,
    "displayedStart": -1,
    "duration": 1148,
    "ingestionTime": null,
    "isAtLiveHead": false,
    "loaded": 592.508,
    "seekableStart": 0,
    "seekableEnd": 1147.104,
    "offset": 0,
    "viewerLivestreamJoinMediaTime": 0
  }
}`;
const playingAtts = `{
  "muted": false,
  "volume": 100
}`;

/*// 1. Create a local variable to hold the live timestamp
let currentYouTubeTime = 0;

// 2. VVVVV Set up a global message listener to receive updates from the YouTube iframe
window.addEventListener('message', function(event) {
    // Only parse strings that look like JSON object payloads
    try {
        const data = JSON.parse(event.data);
        
        // Check if the message is a delivery of the video's current time
        if (data.event === 'infoDelivery' && data.info && typeof data.info.currentTime !== 'undefined') {
            currentYouTubeTime = data.info.currentTime;
        }
    } catch (e) {
        // Safe fail for messages from other sources/extensions on the page
    }
});*/
window.addEventListener("message", (event) => {
    // Security check: Ensure the message actually came from YouTube
    // if (!event.origin.includes("youtube.com")) return;

    try {
        const data = JSON.parse(event.data);

        // Extract the unique ID we assigned in Step 1
        const playerId = data.id;

        // Find the specific iframe element that sent this message
        const matchingIframe = document.querySelector(`[data-player-id="${playerId}"]`);

        if (true || matchingIframe) {
            console.log(`Video ${playerId} sent an event:`, data.event);
            
            // Example: Handle specific events
            if (data.event === "infoDelivery") {
                // Do something with data.info.currentTime for THIS specific video
                videos[playerId - 1][1] = data.info;
                // Note: Any non-permanent attributes can be added here for permanent useage
                if (data.info.playerState) {
                    videos[playerId - 1][0].playerState = data.info.playerState;
                }
                if (data.info.seekableEnd) {
                    videos[playerId - 1][0].duration = data.info.seekableEnd;
                } else if (data.info.duration) {
                    videos[playerId - 1][0].duration = data.info.duration;
                }
            }
        }
    } catch (error) {
        // Handle non-JSON messages from other extensions/scripts
    }
});
// 2. ^^^^^

// Variables
const navModifiers = [0.05, 0.25, 1, 5, 30];
const speedModifiers = [0.0001, 0.001, 0.01, 0.1, 0.25, 0.5, 1, 5, 10];
const durationRounding = [null, -1, 2];
let highlightOutline = true;
let durationOutlineIndex = 2;
let currentIndex = 0;
let videos;
let currentTextIndex = -1;
let textBoxes;
let cheezeIt = false;

// Overlays
const videoOverlay = document.createElement('div');
videoOverlay.id = 'custom-video-overlay';
videoOverlay.overlayTimeout = null;
videoOverlay.clearTextTimeout = null;
videoOverlay.addEventListener('click', () => {
    clearTimeout(videoOverlay.overlayTimeout);
    clearTimeout(videoOverlay.clearTextTimeout);
    videoOverlay.clearTextTimeout = setTimeout(() => {videoOverlay.innerText = "";}, 200);
    videoOverlay.classList.remove('show');
});
document.body.appendChild(videoOverlay);

const durationOverlay = document.createElement('div');
durationOverlay.id = 'custom-video-overlay';
durationOverlay.overlayTimeout = null;
durationOverlay.clearTextTimeout = null;
durationOverlay.addEventListener('click', () => {
    clearTimeout(durationOverlay.overlayTimeout);
    clearTimeout(durationOverlay.clearTextTimeout);
    durationOverlay.clearTextTimeout = setTimeout(() => {durationOverlay.innerText = "";}, 200);
    durationOverlay.classList.remove('show');
});
durationOverlay.style.top = "90%";
document.body.appendChild(durationOverlay);

const styles = document.createElement('style');
styles.textContent = `
  #custom-video-overlay {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    font-size: 18px;
    font-weight: bold;
    z-index: 999999; /* Ensures it sits on top of the video player */
    /*pointer-events: none;*/ /* Clicking through it still works but cannot disappear via clicking */
    opacity: 0;
    transition: opacity 0.2s ease-in-out;

    max-height: 200px;         /* Caps the height so it doesn't overflow the screen */
    max-width: 80vw;           /* Caps the width to 80% of the viewport width */
    overflow-y: auto;          /* Enables vertical scrolling only when text overflows */
    overflow-x: auto;          /* Enables horizontal scrolling if text is a massive single line */
    white-space: pre-wrap;     /* Optional: Forces long text blocks to break lines cleanly */
  }
  #custom-video-overlay.show {
    opacity: 1;
  }


  .highlighted {
    position: relative !important;
    outline: 4px solid #3b82f6 !important;
    outline-offset: 4px;
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
    transition: outline 0.2s ease-in-out;
  }
`;
document.head.appendChild(styles);

// Functions
function getDecimalCount(num) {
  if (Number.isInteger(num)) return 0;

  const cleanStr = (+num.toFixed(4)).toString(); // Capped at 4 decimals because 2**-4 is minimum value
  return cleanStr.split('.')[1].length;
}

function formatVidTime(seconds, truncation=null) {
    if (isNaN(seconds)) return seconds;
    let wholeSeconds = Math.floor(seconds);
    let fraction = String(seconds).split('.')[1];
    if (fraction) {
        fraction = "." + fraction;
        if (truncation !== null) fraction = fraction.slice(0, truncation + 1);
    } else if (truncation !== null && truncation > 0) fraction = "." + "0".repeat(truncation);
    else fraction = "";

    let hours = Math.floor(wholeSeconds / 3600);
    let minutes = Math.floor((wholeSeconds % 3600) / 60);
    if (minutes > 0 || hours > 0) minutes = String(minutes).padStart(2, "0") + ":";
    else minutes = "";
    if (hours > 0) hours = String(hours).padStart(2, "0") + ":";
    else hours = "";
    let secs = String(wholeSeconds % 60).padStart(2, "0");

    return `${hours}${minutes}${secs}${fraction}`;
}

function flashIndicator(text, showTime=1000, overlay=videoOverlay) {
  overlay.innerText = text;
  overlay.classList.add('show');
  
  clearTimeout(overlay.overlayTimeout); // Reset the hide timer if the user keeps pressing keys
  clearTimeout(overlay.clearTextTimeout);
  overlay.overlayTimeout = setTimeout(() => {
    overlay.clearTextTimeout = setTimeout(() => {overlay.innerText = "";}, 200);
    overlay.classList.remove('show');
  }, showTime);
}

function highlightVideos(theVids) {
  theVids.forEach(video => {
    // Check if we've already highlighted this video
    if (video.dataset.highlighted === 'true') return;
    video.dataset.highlighted = 'true';

    // Ensure video is focusable without changing DOM structure
    video.setAttribute('tabindex', '0');

    // Create a visual overlay matching the video's bounding rect
    const rect = video.getBoundingClientRect();
    const highlightBox = document.createElement('div');
    highlightBox.className = 'video-highlight-overlay';
    
    // Style as an overlay without moving the video element
    Object.assign(highlightBox.style, {
      position: 'absolute',
      top: `${rect.top + window.scrollY}px`,
      left: `${rect.left + window.scrollX}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      pointerEvents: 'none', // Prevents blocking player UI clicks
      zIndex: '9999'
    });

    document.body.appendChild(highlightBox);
  });
}

function highlightVideo(theVids, index) {
  theVids.forEach(video => {
    video.parentElement.classList.remove('highlighted');
  });

  if (index === null) return;
  
  if (index >= 0 && index < theVids.length) {
    const targetVideo = theVids[index];
    if (highlightOutline) targetVideo.parentElement.classList.add('highlighted');
    // targetVideo.focus();
  }
}

function blockKeyEvents(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
}

async function waitForVideos() {
    while (document.querySelectorAll("iframe").length === 0) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // todo: change back to 100
    }
    
    return Array.from(document.querySelectorAll("iframe"), x => [x, null]);
    // return Array.from(document.querySelectorAll("iframe")).map(x => [x, null]);
}

// Main Script
(async () => {
    videos = await waitForVideos();
    // 3. VVVVVV FORCE the YouTube Player to send time updates every 250ms
    // Run this right after the page loads or when your iframe is ready
    /*videos.forEach(iframe => {
        iframe.contentWindow.postMessage(JSON.stringify({
            "event": "listening",
            "id": 1,
            "channel": "widget"
        }), "*");
    });*/

    videos.forEach((iframe, index) => {
        // Generate a unique ID for this specific iframe (e.g., youtube-player-0, youtube-player-1)
        const uniqueId = `youtube-player-${index}`;
        
        // Optional: Store it on the element so you can easily look it up later
        iframe[0].dataset.playerId = uniqueId; 
    
        // Send the initialization handshake
        iframe[0].contentWindow.postMessage(JSON.stringify({
            "event": "listening",
            "id": uniqueId, 
            "channel": "widget"
        }), "*");
    });
    // 3. ^^^^^^

    setInterval(() => {
        // Optional TODO: Auto Update for iFrames
        // videos = document.querySelectorAll('iframe').map(x => [x, null]);
        textBoxes = [...document.querySelectorAll("input"), ...document.querySelectorAll("textarea")];
        highlightVideos(videos.map(x => x[0]));
        highlightVideo(videos.map(x => x[0]), currentIndex);
    }, 100);

    setInterval(() => {
        if (currentIndex !== null) {
            videos.forEach(v => {
                if (durationOutlineIndex !== -1 && v === videos[currentIndex]) {
                    // TODO: Get video duration
                    // TODO: Have it work for multiple iframes
                    flashIndicator(`${formatVidTime(v[1].currentTime, durationRounding[durationOutlineIndex])} / ${formatVidTime(v[0].duration, durationRounding[durationOutlineIndex])}`, 1, durationOverlay);
                }
                /*if (v.replay) {
                    if (v.currentTime < v.replayStart || v.currentTime > v.replayEnd) {
                            v.currentTime = v.replayStart;
                        }
                }
                if (v.allowCuts) {
                    for (let i = 0; i < v.cuts.length; i++) {
                        if (v.cuts[i]) {
                            if (v.cuts[i][0] < v.currentTime && v.currentTime < v.cuts[i][1]) {
                                v.currentTime = v.cuts[i][1];
                            }
                        }
                    }
                }*/
            });
        }
    }, 1);

    flashIndicator("Ctrl + Shift + / (Ctrl + ?) for shortcuts", 3000);
    window.addEventListener("keydown", (event) => {
      // Selecting Video feature
      if (currentIndex !== null && event.key === "Escape") {
          blockKeyEvents(event);
          if (textBoxes.includes(document.activeElement)) {
              videos[currentIndex].focus();
              flashIndicator("Exited Text Box");
          } else {
              currentIndex = null;
              flashIndicator("Disabled Program (Ctrl + \` to restart)", 3000);
          }
      } else if (currentIndex === null) {
          if (event.ctrlKey && event.key === "`") {
              blockKeyEvents(event);
              currentIndex = 0;
              flashIndicator(`Enabled Program (Esc to end)`, 3000);
          }
      } else if (!['INPUT', 'TEXTAREA'].includes(event.target.tagName) && event.key === 'Tab') {
        blockKeyEvents(event);
    
        if (videos.length === 0 || currentIndex === null) return; // Make sure Tab/Shift + Tab only happens IF THERE IS AT LEAST 1 VIDEO
    
        if (event.shiftKey) {
          // Shift + Tab: Move backward
          currentIndex = currentIndex <= 0 ? videos.length - 1 : currentIndex - 1;
        } else {
          // Tab: Move forward
          currentIndex = currentIndex >= videos.length - 1 ? 0 : currentIndex + 1;
        }
    
        highlightVideo(videos.map(x => x[0]), currentIndex);
        flashIndicator(`Selected Video ${currentIndex+1}`);
      } else if (event.ctrlKey && event.altKey && ["H", "h"].includes(event.key)) {
          blockKeyEvents(event);
          highlightOutline = !highlightOutline;
          flashIndicator(`Outline ${highlightOutline ? "En" : "Dis"}abled`);
      } else if (event.ctrlKey && event.altKey && ["D", "d"].includes(event.key)) {
          blockKeyEvents(event);
          if (durationOutlineIndex === durationRounding.length - 1) {
              durationOutlineIndex = -1;
              flashIndicator("Video Duration Hidden");
          } else {
              durationOutlineIndex = (durationOutlineIndex + 1) % durationRounding.length;
              if (durationRounding[durationOutlineIndex] === null) {
                  flashIndicator("Video Duration Shown");
              } else if (durationRounding[durationOutlineIndex] === -1) {
                  flashIndicator("Video Duration Truncated to the nearest Second");
              } else {
                  flashIndicator(`Video Duration Truncated to ${durationRounding[durationOutlineIndex]} Digits`);
              }
          }
      } else if (textBoxes.length > 0 && event.altKey && ["/", "?"].includes(event.key)) {
        if (textBoxes.includes(document.activeElement) || !(currentTextIndex >= 0 && currentTextIndex < textBoxes.length)) {
            if (event.shiftKey) {
              currentTextIndex = currentTextIndex <= 0 ? textBoxes.length - 1 : currentTextIndex - 1;
            } else {
              currentTextIndex = currentTextIndex >= textBoxes.length - 1 ? 0 : currentTextIndex + 1;
            }
        }
        textBoxes[currentTextIndex].focus();
        flashIndicator(`Selected Text Box ${currentTextIndex+1}`);
      }

      if (videos.length > 0 && currentIndex !== null) (aVideo => {
        if (!['INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
            /*// Defining attributes
            if (!("replayStart" in aVideo[1])) aVideo[1].replayStart = 0;
            if (!("replayEnd" in aVideo[1])) aVideo[1].replayEnd = aVideo[1].duration;
            if (!("cuts" in aVideo[1])) aVideo[1].cuts = [];
            if (!("navModIter" in aVideo[1])) aVideo[1].navModIter = 3;
            if (!("speedModIter" in aVideo[1])) aVideo[1].speedModIter = 4;
            if (!("replay" in aVideo[1])) aVideo[1].replay = false;
            if (!("allowCuts" in aVideo[1])) aVideo[1].allowCuts = false;
            if (!("cutIter" in aVideo[1])) aVideo[1].cutIter = "";
            if (!("deleteCutIter" in aVideo[1])) aVideo[1].deleteCutIter = "";
            if (!("volMod" in aVideo[1])) aVideo[1].volMod = 0.1;
            if (!("savedTimeStamps" in aVideo[1])) aVideo[1].savedTimeStamps = [];
            if (!("savedUndos" in aVideo[1])) aVideo[1].savedUndos = [];
            // if (!("paused" in aVideo[1])) aVideo[1].paused = true;
            // if (!("playbackRate" in aVideo[1])) aVideo[1].playbackRate = 1;*/
        
            const quality = aVideo[1].getVideoPlaybackQuality?.();
            const fps = (quality && quality.totalVideoFrames && quality.totalFrameDelay)
                ? quality.totalVideoFrames / quality.totalFrameDelay
                : 100;
            // History Feature
            if (event.altKey && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
                blockKeyEvents(event);
                event.key === 'ArrowLeft' ? window.history.back() : window.history.forward();
            }
            if (event.ctrlKey && event.key === "?") {
                flashIndicator(`Click this box to close\n\
====================================================================\n\
Selecting Video\n\
Esc - Exit Text Box/End Program\n\
Ctrl + \` - Restart Program\n\n\
Tab - Select Next Video\n\
Shift + Tab - Select Previous Video\n\n\
Alt + Slash (/) - Select Next Text Box\n\
Alt + Shift + Slash (/) (Alt + ?) - Select Previous Text Box\n\n\
Ctrl + Alt + H - Hide Outline (in case it doesn't work or hides the video)\n\
Ctrl + Alt + D - Toggle Duration Outline\n\
====================================================================\n\
Play/Pause\n\
Space/K/Enter - Play/Pause\n\
====================================================================\n\
Controls\n\
F - Toggle Fullscreen\n\
Ctrl + Alt + C - Show all Controls\n\
Ctrl + Alt + L - Toggle Loop\n\
Ctrl + Alt + P - Toggle Picture-in-Picture\n\
====================================================================\n\
Navigation\n\
Comma - Go back 1 frame\n\
Period - Go forward 1 frame\n\n\
Numbers (0-9) = Go to percentage of video length\n\n\

Left Arrow - Go back by Navigation Modifier\n\
Right Arrow - Go forward by Navigation Modifier\n\
J - Go back by 2 * Navigation Modifier\n\
L - Go forward by 2 * Navigation Modifier\n\n\
Ctrl + Left Arrow - Decrease Navigation Modifier\n\
Ctrl + Right Arrow - Increase Navigation Modifier\n\

Ctrl + Z - Undo to last timestamp before Navigation
Ctrl + Y - Redo to last timestamp before Undo
====================================================================\n\
Volume\n\
Up Arrow - Increase Volume by Volume Modifier\n\
Down Arrow - Decrease Volume by Volume Modifier\n\n\
Ctrl + Up Arrow - Increase Volume Modifier\n\
Ctrl + Down Arrow - Decrease Volume Modifier\n\n\
M - Toggle mute\n\
====================================================================\n\
Playback Rate/Speed\n\
Shift + Space - Reset Playback Rate and Speed Modifier\n\n\
Shift + Comma (Less Than) - Decrease Playback Rate by Speed Modifier\n\
Shift + Period (Greater Than) - Increase Playback Rate by Speed Modifier\n\n\
Ctrl + Shift + Comma (Ctrl + Less Than) - Decrease Speed Modifier\n\
Ctrl + Shift + Period (Ctrl + Greater Than) - Increase Speed Modifier\n\
====================================================================\n\
Replay\n\
Shift + Up Arrow - Cycle Enabling Replay and/or Cuts\n\
Shift + Down Arrow - Disable Replay and Cuts\n\n\
Shift + Left Arrow - Set Replay Start\n\
Shift + Right Arrow - Set Replay End\n\
====================================================================\n\
Cut\n\
Shift + Up Arrow - Cycle Enabling Replay and/or Cuts\n\
Shift + Down Arrow - Disable Replay and Cuts\n\n\
Shift + Numbers (0-9) - Set Cut Customization (e.g. Shift + 1 + 9 - Customize Cut 19)\n\
Shift + Left Arrow (while Customizing Cut) - Set Cut Start\n\
Shift + Right Arrow (while Customizing Cut) - Set Cut End\n\n\
Ctrl + Shift + Numbers (0-9) - Set Cut Deletion (e.g. Shift + 1 + 9 - Delete Cut 19)\n\n\
Ctrl + Shift - Finish Cut Customization/Confirm Cut Deletion`, 2**16);
            }
            // Playback Rate/Speed feature
            else if (event.shiftKey && event.key === " ") {
                blockKeyEvents(event);
                aVideo[1].speedModIter = 4;
                aVideo[1].playbackRate = 1;
                flashIndicator(`${aVideo[1].playbackRate}x ± ${speedModifiers[aVideo[1].speedModIter]}x`);
            } else if (event.ctrlKey && ["<", ">"].includes(event.key)) {
              if (event.key === ">") {
                return;
                aVideo[1].speedModIter = Math.min(aVideo[1].speedModIter + 1, speedModifiers.length - 1);
              } else {
                aVideo[1].speedModIter = Math.max(aVideo[1].speedModIter - 1, 0);
              }
              flashIndicator(`±${speedModifiers[aVideo[1].speedModIter].toFixed(getDecimalCount(speedModifiers[aVideo[1].speedModIter]))}x`);
            } else if (["<", ">"].includes(event.key)) {
              aVideo[0].contentWindow.postMessage(JSON.stringify({
                  "event": "command",
                  "func": "setPlaybackRate",
                  "args": [aVideo[1].playbackRate + (event.key === "<" ? -0.25 : 0.25)]
              }), "*");
              flashIndicator(`${aVideo[1].playbackRate.toFixed(2)}x`);
            }
            // Replay + Cut feature
            else if (event.shiftKey && event.key === "ArrowUp") {
                blockKeyEvents(event);
                if (aVideo[1].replay && aVideo[1].allowCuts) {
                    aVideo[1].allowCuts = false;
                }
                else if (aVideo[1].replay && !aVideo[1].allowCuts) {
                    aVideo[1].replay = false;
                    aVideo[1].allowCuts = true;
                }
                else {
                    aVideo[1].replay = true;
                    aVideo[1].allowCuts = true;
                }
                flashIndicator(`${aVideo[1].replay ? `Replay (${formatVidTime(aVideo[1].replayStart)} to ${formatVidTime(aVideo[1].replayEnd)}) ` : ""}${aVideo[1].replay && aVideo[1].allowCuts ? "+ " : ""}${aVideo[1].allowCuts ? `Cuts ${Object.keys(aVideo[1].cuts).map(Number)} ` : ""}On`);
            } else if (event.shiftKey && event.key === "ArrowDown") {
                blockKeyEvents(event);
                aVideo[1].replay = false;
                aVideo[1].allowCuts = false;
                flashIndicator(`Replay (${formatVidTime(aVideo[1].replayStart)} to ${formatVidTime(aVideo[1].replayEnd)}) + Cuts ${Object.keys(aVideo[1].cuts).map(Number)} Off`);
            } else if (event.shiftKey && event.key === "ArrowLeft") {
                blockKeyEvents(event);
                if (aVideo[1].cutIter) {
                    if (!aVideo[1].cuts[aVideo[1].cutIter]) aVideo[1].cuts[aVideo[1].cutIter] = [];
                    aVideo[1].cuts[aVideo[1].cutIter][0] = aVideo[1].currentTime;
                    flashIndicator(`Cut ${aVideo[1].cutIter}: ${formatVidTime(aVideo[1].cuts[aVideo[1].cutIter][0])} to ${formatVidTime(aVideo[1].cuts[aVideo[1].cutIter][1])} (Ctrl + Shift to finish)`);
                } else {
                    aVideo[1].replayStart = aVideo[1].currentTime;
                    flashIndicator(`Replay: ${formatVidTime(aVideo[1].replayStart)} to ${formatVidTime(aVideo[1].replayEnd)}`);
                }
            } else if (event.shiftKey && event.key === "ArrowRight") {
                blockKeyEvents(event);
                if (aVideo[1].cutIter) {
                    if (!aVideo[1].cuts[aVideo[1].cutIter]) aVideo[1].cuts[aVideo[1].cutIter] = [];
                    aVideo[1].cuts[aVideo[1].cutIter][1] = aVideo[1].currentTime;
                    flashIndicator(`Cut ${aVideo[1].cutIter}: ${formatVidTime(aVideo[1].cuts[aVideo[1].cutIter][0])} to ${formatVidTime(aVideo[1].cuts[aVideo[1].cutIter][1])} (Ctrl + Shift to finish)`);
                } else {
                    aVideo[1].replayEnd = aVideo[1].currentTime;
                    flashIndicator(`Replay: ${formatVidTime(aVideo[1].replayStart)} to ${formatVidTime(aVideo[1].replayEnd)}`);
                }
            }
            // Cut feature
            else if (false) {
                if (false) {}
                else if (event.shiftKey && event.ctrlKey && /^Digit[0-9]$/.test(event.code)) {
                    blockKeyEvents(event);
                    if (event.code === "Digit0" && aVideo[1].deleteCutIter === "") {
                        flashIndicator(`Cannot start cut number with 0`);
                    } else {
                        aVideo[1].deleteCutIter += event.code.replace("Digit", "");
                        let timeframe = "";
                        if (aVideo[1].cuts[aVideo[1].deleteCutIter]) {
                            timeframe = ` (${formatVidTime(aVideo[1].cuts[aVideo[1].deleteCutIter][0])} to ${formatVidTime(aVideo[1].cuts[aVideo[1].deleteCutIter][1])})`
                        }
                        flashIndicator(`Deleting Cut ${aVideo[1].deleteCutIter}${timeframe} (Ctrl + Shift to delete)`);
                    }
                } else if (event.shiftKey && /^Digit[0-9]$/.test(event.code)) {
                    blockKeyEvents(event);
                    if (event.code === "Digit0" && aVideo[1].cutIter === "") {
                        flashIndicator(`Cannot start cut number with 0`);
                    } else {
                        aVideo[1].cutIter += event.code.replace("Digit", "");
                        let timeframe = "";
                        if (aVideo[1].cuts[aVideo[1].cutIter]) {
                            timeframe = ` (${formatVidTime(aVideo[1].cuts[aVideo[1].cutIter][0])} to ${formatVidTime(aVideo[1].cuts[aVideo[1].cutIter][1])})`
                        }
                        flashIndicator(`Customizing Cut ${aVideo[1].cutIter}${timeframe} (Ctrl + Shift to finish)`);
                    }
                } else if (event.shiftKey && event.ctrlKey) {
                    if (aVideo[1].deleteCutIter) {
                        if (aVideo[1].cuts[aVideo[1].deleteCutIter]) {
                            delete aVideo[1].cuts[aVideo[1].deleteCutIter];
                            flashIndicator(`Deleted Cut ${aVideo[1].deleteCutIter}`);
                            aVideo[1].cuts.length = Object.keys(aVideo[1].cuts).length ? +Object.keys(aVideo[1].cuts).at(-1) + 1 : 0;
                        } else {
                            flashIndicator(`Cut ${aVideo[1].deleteCutIter} does not exist`);
                        }
                        aVideo[1].deleteCutIter = "";
                    } else if (aVideo[1].cutIter) {
                        flashIndicator(`Finished Customizing Cut ${aVideo[1].cutIter}`);
                        aVideo[1].cutIter = "";
                    }
                }
            }
            // Play/Pause feature
            else if ([" ", "K", "k", "Enter"].includes(event.key)) {
                blockKeyEvents(event);
                aVideo[0].contentWindow.postMessage(JSON.stringify({
                    "event": "command",
                    "func": `${aVideo[0].playerState === 1 ? "pause" : "play"}Video`,
                    "args": []
                }), "*");
                flashIndicator(`Video ${aVideo[0].playerState === 1 ? "Paused" : "Playing"}`);
            }
            // Controls feature
            else if (["F", "f"].includes(event.key)) {
                blockKeyEvents(event);
                if (!document.fullscreenElement) {
                    if (aVideo[1].requestFullscreen) {
                        aVideo[1].requestFullscreen();
                        flashIndicator("Entered Fullscreen");
                    } else if (aVideo[1].webkitRequestFullscreen) {
                        aVideo[1].webkitRequestFullscreen();
                        flashIndicator("Entered Fullscreen");
                    } else {
                        flashIndicator("Fullscreen not available");
                    }
                } else if (document.exitFullscreen) {
                    document.exitFullscreen();
                    flashIndicator("Exited Fullscreen");
                }
            } else if (event.ctrlKey && event.altKey && ["C", "c"].includes(event.key)) {
                blockKeyEvents(event);
                // aVideo[1].controls = !aVideo[1].controls;
                // flashIndicator(`Controls ${aVideo[1].controls ? "En" : "Dis"}abled`);
                cheezeIt = !cheezeIt;
                flashIndicator(`Cheeze ${cheezeIt ? "En" : "Dis"}abled`);
            } else if (event.ctrlKey && event.altKey && ["L", "l"].includes(event.key)) {
                blockKeyEvents(event);
                aVideo[1].loop = !aVideo[1].loop;
                flashIndicator(`Loop ${aVideo[1].loop ? "En" : "Dis"}abled`);
            } else if (event.ctrlKey && event.altKey && ["P", "p"].includes(event.key)) {
                blockKeyEvents(event);
                if (aVideo[1].hasAttribute('__pip__')) {
                    document.exitPictureInPicture();
                    flashIndicator("Ended Picture-in-Picture");
                } else {
                    if (document.pictureInPictureElement) document.exitPictureInPicture();
                    aVideo[1].removeAttribute("disablePictureInPicture");
                    aVideo[1].requestPictureInPicture();
                    aVideo[1].setAttribute('__pip__', true);
                    aVideo[1].addEventListener('leavepictureinpicture', event => {
                        aVideo[1].removeAttribute('__pip__');
                    }, { once: true });
                    flashIndicator(`Started Picure-in-Picture for Video ${currentIndex+1}`);
                }
            }
            // Navigation feature
            else if ([",", "."].includes(event.key)) {
                blockKeyEvents(event);
                aVideo[1].currentTime += event.key === "," ? -1/fps : 1/fps;
                flashIndicator(`${event.key === "," ? "-" : "+"}1 frame`);
            } else if (event.ctrlKey && ["ArrowLeft", "ArrowRight"].includes(event.key)) {
              return;
              blockKeyEvents(event);
              if (event.key === "ArrowLeft") {
                aVideo[1].navModIter = Math.max(aVideo[1].navModIter - 1, 0);
              } else {
                aVideo[1].navModIter = Math.min(aVideo[1].navModIter + 1, navModifiers.length - 1);
              }
              flashIndicator(`±${navModifiers[aVideo[1].navModIter]}s`);
            } else if (/^Digit[0-9]$/.test(event.code)) {
                blockKeyEvents(event);
                // aVideo[1].savedTimeStamps.push([aVideo[1].currentTime, "Go to percentage of video length"]);
                aVideo[0].contentWindow.postMessage(JSON.stringify({
                    "event": "command",
                    "func": "seekTo",
                    "args": [aVideo[0].duration * JSON.parse(event.code.replace("Digit", "")) / (cheezeIt ? 1 : 10), true]
                }), "*");
                flashIndicator(cheezeIt ? "Keep spamming to cheeze to the end!!!" : `${JSON.parse(event.code.replace("Digit", "")) * 10}% of Video Duration`);
            } else if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
                blockKeyEvents(event);
                // aVideo[1].savedTimeStamps.push([aVideo[1].currentTime, `Go ${event.key === "ArrowLeft" ? "back" : "forward"} by Navigation Modifier`]);
                const incrementVid = 5; // navModifiers[aVideo[1].navModIter];
                aVideo[0].contentWindow.postMessage(JSON.stringify({
                    "event": "command",
                    "func": "seekTo",
                    "args": [aVideo[1].currentTime + incrementVid * (event.key === "ArrowLeft" ? -1 : 1), true]
                }), "*");
                flashIndicator(`${event.key === "ArrowLeft" ? "-" : "+"}${incrementVid}s`);
            } else if (["j", "l"].includes(event.key.toLowerCase())) {
                blockKeyEvents(event);
                // aVideo[1].savedTimeStamps.push([aVideo[1].currentTime, `Go ${event.key.toLowerCase() === "j" ? "back" : "forward"} by 2 * Navigation Modifier`]);
                const incrementVid = 5; // navModifiers[aVideo[1].navModIter];
                aVideo[0].contentWindow.postMessage(JSON.stringify({
                    "event": "command",
                    "func": "seekTo",
                    "args": [aVideo[1].currentTime + incrementVid * (event.key.toLowerCase() === "j" ? -2 : 2), true]
                }), "*");
                flashIndicator(`${event.key.toLowerCase() === "j" ? "-" : "+"}${2 * incrementVid}s`);
            } else if (event.ctrlKey && ["z", "Z"].includes(event.key)) {
                blockKeyEvents(event);
                const timeStamp = aVideo[1].savedTimeStamps.pop();
                if (timeStamp) {
                    aVideo[1].savedUndos.push([timeStamp, aVideo[1].currentTime]);
                    aVideo[1].currentTime = timeStamp[0];
                    flashIndicator(`Undo to ${formatVidTime(timeStamp[0])} (Rolled back from "${timeStamp[1]}")`);
                } else {
                    flashIndicator("No Recent Navigation");
                }
            } else if (event.ctrlKey && ["y", "Y"].includes(event.key)) {
                blockKeyEvents(event);
                const recentUndo = aVideo[1].savedUndos.pop();
                if (recentUndo) {
                    // aVideo[1].savedTimeStamps.push(recentUndo[0]);
                    aVideo[1].currentTime = recentUndo[1];
                    flashIndicator(`Redo to ${formatVidTime(recentUndo[1])} (Rolled from "${recentUndo[0][1]}")`);
                } else {
                    flashIndicator("No Recent Undos");
                }
            }
            // Volume feature
            else if (false) {
                if (false) {}
                else if (event.ctrlKey && ["ArrowDown", "ArrowUp"].includes(event.key)) {
                    blockKeyEvents(event);
                    if (event.key === "ArrowUp") {
                        aVideo[1].volMod = Math.round(100 * Math.min(1, aVideo[1].volMod + 0.01)) / 100;
                    } else {
                        aVideo[1].volMod = Math.round(100 * Math.max(0, aVideo[1].volMod - 0.01)) / 100;
                    }
                    flashIndicator(`±${Math.round(100 * aVideo[1].volMod)}%`);
                } else if (["ArrowDown", "ArrowUp"].includes(event.key)) {
                    blockKeyEvents(event);
                    if (event.key === "ArrowUp") {
                        aVideo[1].volume = Math.round(100 * Math.min(1, aVideo[1].volume + aVideo[1].volMod)) / 100;
                    } else {
                        aVideo[1].volume = Math.round(100 * Math.max(0, aVideo[1].volume - aVideo[1].volMod)) / 100;
                    }
                    flashIndicator(`Volume: ${Math.round(100 * aVideo[1].volume)}%${aVideo[1].muted ? " (Muted)" : ""}`)
                } else if (["M", "m"].includes(event.key)) {
                    aVideo[1].muted = !aVideo[1].muted;
                    flashIndicator(`${aVideo[1].muted ? "M" : "Unm"}uted`);
                }
            }
        }
      })(videos[currentIndex]);
    }, true);
})();
